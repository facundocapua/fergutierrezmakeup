# Pirsch desde nuestro dominio y registro de rastreadores de IA en el Firewall de Vercel

Investigación del 2026-11-28. Fuentes primarias únicamente (documentación de Pirsch y de Vercel, repositorios oficiales de Pirsch y el propio `pa.js` descargado ese día); la lista está al final. Lo que no se pudo verificar se marca como **no verificado**. Los límites de plan y los precios cambian rápido: llevan fecha. Contexto: [docs/research/analytics.md](./analytics.md) (sección «Decisiones del dueño»), [docs/research/llm-agents.md](./llm-agents.md) (sección 3.1), backlog A3 y [ADR 0001](../adr/0001-content-as-code-without-backend.md).

Este documento no es asesoría jurídica ni se ha probado nada en producción: el código de la sección 1.6 es un **borrador sin ejecutar**.

## 1. Resumen ejecutivo

**Pregunta 1 (Pirsch desde nuestro dominio)**

- **No usar un `rewrite` de Vercel para los endpoints de medición.** Pirsch dice en su FAQ, literalmente, que no se puede: «No, we rely on information provided by the visitor's browser», y que con un rewrite las peticiones «will no longer contain the original IP address» ([FAQ de Pirsch](https://docs.pirsch.io/faq)). Vercel documenta lo contrario sobre sus cabeceras (reenvía `x-forwarded-for` y `x-real-ip` con la IP pública del visitante al origen externo, [Rewrites](https://vercel.com/docs/rewrites)), pero **no hay ninguna fuente que diga que el endpoint `/hit` de Pirsch lea esas cabeceras**. Es **no verificado** y el proveedor dice que no funciona.
- **Lo que sí es oficial en Pirsch:** un proxy propio (PHP, Go, Cloudflare Workers) o un **dominio personalizado (plan Plus, 12 USD/mes frente a 6 del Standard)** ([Proxy](https://docs.pirsch.io/advanced/proxy), [Dominios personalizados](https://docs.pirsch.io/advanced/custom-domains), [precios](https://pirsch.io/pricing)). Ninguno de los dos documenta explícitamente que evite los bloqueadores; solo que las peticiones «no van directamente a pirsch.io».
- **La vía viable dentro de Vercel** es la que el propio Pirsch usa en su proxy: una Route Handler que recibe lo que envía `pa.js` y lo reenvía a la API de Pirsch (`/api/v1/hit` y `/api/v1/event`) con la **IP y el user agent del visitante en el cuerpo** y una **clave de acceso de solo escritura** (`pa_…`). Es documentado de extremo a extremo, es una función sin estado y de coste despreciable en Pro. Choca con la letra de «sin backend» del ADR 0001 (ver 1.7).
- **Recomendación:** **hacerlo solo si el dueño decide que merece la pena y, en ese caso, con la vía de Route Handler (1.6), sirviendo `pa.js` con un rewrite (que no lleva IP) y registrando una adenda al ADR 0001.** Si prefiere cero código y acepta pagar 6 USD/mes más, la alternativa soportada es el dominio personalizado de Pirsch Plus, con la salvedad de que **su efecto sobre los bloqueadores no está documentado**. Ninguna de las dos garantiza evitar Adblock Plus: los filtros pueden coincidir con nombres de ruta o con el contenido, y eso no se puede verificar sin probar.
- **Verificación:** crear un sitio de prueba en Pirsch con su propio código, visitar desde datos móviles con Adblock Plus activo, y comprobar en el panel que **país y ciudad** son los del visitante (no Alemania/Irlanda/EE. UU. ni la región de Vercel) y que los visitantes únicos no se colapsan (1.8).
- **Aspecto legal:** ninguna fuente primaria que encontré (AEPD, EDPB) trata los proxies de primera parte para analítica ni la elusión de bloqueadores. Lo dicho en `analytics.md` sigue igual (1.9).

**Pregunta 2 (regla de Firewall con acción Log, backlog A3)**

- **Se puede en Pro y sin coste:** las reglas personalizadas son gratuitas en todos los planes y Pro permite **40 reglas por proyecto** ([Uso y precios del WAF](https://vercel.com/docs/vercel-firewall/vercel-waf/usage-and-pricing)).
- **No se puede definir en `vercel.json`:** ese fichero solo admite las acciones `challenge` y `deny`; `log`, `bypass` y `redirect` «no están soportados» ([Custom Rules](https://vercel.com/docs/vercel-firewall/vercel-waf/custom-rules)).
- **Sí se puede en código por CLI, API REST o Terraform:** el comando documentado es `vercel firewall rules add … --action log` seguido de `vercel firewall publish` (2.3). La API REST (`PATCH /v1/security/firewall/config`) y Terraform (`vercel_firewall_config`) existen, pero la documentación no muestra un ejemplo con `log` (2.4).
- **Una sola regla** con el operador «Matches expression» (regex PCRE, sin distinguir mayúsculas) cubre todos los user agents (2.2). `Google-Extended` y `Applebot-Extended` **no son user agents** y nunca aparecerán.
- **Dónde se ve:** pestaña Firewall > Traffic (agrupar por User Agents, filtrar por la regla). En Pro la retención de tráfico del Firewall es de **1 día** (24 h) salvo Observability Plus (30 días, 1,20 USD por millón de eventos, activado por defecto en equipos Pro creados o actualizados desde el 2026-04-03).
- **Ya existe una vista sin regla propia:** el conjunto gestionado **AI Bots** (todos los planes) y la pestaña **AI Traffic** de Observability. No sustituyen a la regla si se quiere contar por user agent concreto y Bingbot (2.6).

## 2. Pregunta 2: regla de Firewall con acción Log para rastreadores de IA

Se responde primero porque es la más cerrada y tiene una vía por código.

### 2.1 Qué hace la acción Log

- Deja pasar la petición, la registra y la muestra en las secciones Firewall y Observability, y la envía a Drains ([Firewall concepts](https://vercel.com/docs/vercel-firewall/firewall-concepts)).
- Tras una regla Log la ejecución continúa; **si varias reglas Log coinciden, solo se informa de la última** ([Custom Rules](https://vercel.com/docs/vercel-firewall/vercel-waf/custom-rules)). Por eso conviene **una sola regla** para todos los bots y no una por bot. Si otra regla bloquea la petición antes o después, la petición se atribuye a la regla que bloquea y no aparece en la de Log ([Rule configuration](https://vercel.com/docs/vercel-firewall/vercel-waf/rule-configuration)); hoy no hay otras reglas.
- Los cambios se aplican sin redespliegue ([Custom Rules](https://vercel.com/docs/vercel-firewall/vercel-waf/custom-rules)).

### 2.2 Coincidir con varios user agents en una regla

El parámetro «User Agent» admite estos operadores, todos **sin distinguir mayúsculas** ([Rule configuration](https://vercel.com/docs/vercel-firewall/vercel-waf/rule-configuration)): `eq`, `neq`, `inc` («Is any of»: **coincidencia exacta** con cualquiera de los valores, como un `IN` de SQL), `ninc`, `sub` (contiene), `pre`, `suf`, `re` («Matches expression»: regex **PCRE**) y `ex`.

- `inc` no sirve: un user agent real es una cadena larga (`Mozilla/5.0 … compatible; GPTBot/1.3; …`), no un nombre exacto.
- **Opción A (recomendada): una condición `re` con alternancia.**
- Opción B: varias condiciones `sub` unidas con **OR** en el formulario (hasta que el dueño prefiera ver cada una por separado; no cambia el resultado porque solo se informa de una regla).

Valor propuesto para la regex (nombres de la tabla de [llm-agents.md, 3.1](./llm-agents.md), más Bingbot):

```
OAI-SearchBot|ChatGPT-User|GPTBot|ClaudeBot|Claude-User|Claude-SearchBot|PerplexityBot|Perplexity-User|Applebot|Google-Agent|Bingbot
```

Notas sobre la lista pedida:

| Nombre                                                                                                                                               | ¿Aparece como user agent?                                                                                                                                                                                                                                                     | Qué hacer                                                |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `OAI-SearchBot`, `ChatGPT-User`, `GPTBot`, `ClaudeBot`, `Claude-User`, `Claude-SearchBot`, `PerplexityBot`, `Perplexity-User`, `Applebot`, `Bingbot` | Sí (nombres de la tabla 3.1; todos figuran también en el [directorio de bots verificados de Vercel](https://vercel.com/docs/bot-management))                                                                                                                                  | Incluir en la regex                                      |
| `Google-Agent`                                                                                                                                       | Sí según [llm-agents.md](./llm-agents.md) 3.1 y figura en el directorio de Vercel como categoría `agent`. **La cadena exacta del user agent no la verifiqué.**                                                                                                                | Incluir; confirmar con el primer hit real                |
| `Google-Extended`                                                                                                                                    | **No.** Es un token de `robots.txt`, no un user agent; Google lo declara «token de producto independiente» ([llm-agents.md](./llm-agents.md) 3.1). El rastreo lo hace Googlebot. Vercel lo lista en su directorio como `ai_crawler`; **cómo lo detecta no está documentado**. | No incluir; no hay forma de contarlo por user agent      |
| `Applebot-Extended`                                                                                                                                  | **No.** Solo controla el uso de contenido ya rastreado (tabla 3.1).                                                                                                                                                                                                           | No incluir (`Applebot` ya recoge al rastreador real)     |
| `Googlebot`                                                                                                                                          | Sí, pero no estaba en la lista pedida                                                                                                                                                                                                                                         | Opcional; añadirlo hace ruido (rastreo normal de Search) |

Por qué `Applebot` y `Bingbot` en una regex de «IA»: Applebot alimenta Siri/Spotlight y puede entrenar modelos de Apple; Bingbot es el índice que usa Copilot (esto último, **no verificado**, según llm-agents.md). Contarlos con el resto permite compararlos.

### 2.3 Crear la regla

**Ruta A: dashboard** (pasos tal como los documenta [Custom Rules](https://vercel.com/docs/vercel-firewall/vercel-waf/custom-rules)). Hace falta rol de administrador del proyecto, miembro del equipo o seguridad.

1. En el dashboard, abrir el proyecto y **Firewall** en la barra lateral.
2. **⋯ > Configure**, arriba a la derecha.
3. **Add New… > Rule**.
4. Nombre: `Log AI crawlers`.
5. En **Configure**, **If**: parámetro **User Agent**, operador **Matches expression**, valor: la regex de 2.2.
6. **Then**: **Log**.
7. **Save Rule**.
8. **Review Changes** (arriba a la derecha) y **Publish**.
9. En la vista general del Firewall, elegir la regla en el desplegable de agrupación y mirar **User Agents** (ver 2.5).

También se puede describir la regla en lenguaje natural en el campo de texto superior del formulario («Generate Rule»), pero conviene revisar el resultado.

**Ruta B: por código con la CLI de Vercel.** Está documentada en [`vercel firewall`](https://vercel.com/docs/cli/firewall) (página actualizada el 2026-09-16). La versión mínima de la CLI **no está indicada**: usar `npx vercel@latest`.

```sh
npx vercel@latest firewall rules add "Log AI crawlers" \
  --condition '{"type":"user_agent","op":"re","value":"OAI-SearchBot|ChatGPT-User|GPTBot|ClaudeBot|Claude-User|Claude-SearchBot|PerplexityBot|Perplexity-User|Applebot|Google-Agent|Bingbot"}' \
  --action log --yes

npx vercel@latest firewall diff       # revisar lo que se publicará
npx vercel@latest firewall publish --confirm-name <nombre-del-proyecto>
```

- `--action` acepta `deny, challenge, log, bypass, rate_limit, redirect`; `--condition` lleva `type`, `op` y `value`; `--yes` omite la confirmación. Los cambios quedan **en borrador hasta `publish`**.
- El ejemplo oficial usa `{"type":"user_agent","op":"sub","value":"crawler"}`. El tipo `user_agent` y el operador `re` («Matches expression», clave `re` en la tabla de operadores) están documentados por separado; **la combinación `user_agent` + `re` no aparece en un ejemplo literal**: comprobarla con `firewall diff` antes de publicar.
- Equivalente con carga JSON completa (el formato documentado usa `action.mitigate.action`; con `deny` está en el ejemplo oficial, con `log` es la misma forma pero **no hay ejemplo literal**):

```sh
npx vercel@latest firewall rules add --yes --data '{
  "name": "Log AI crawlers",
  "conditionGroup": [
    { "conditions": [ { "type": "user_agent", "op": "re", "value": "OAI-SearchBot|ChatGPT-User|GPTBot|ClaudeBot|Claude-User|Claude-SearchBot|PerplexityBot|Perplexity-User|Applebot|Google-Agent|Bingbot" } ] }
  ],
  "action": { "mitigate": { "action": "log" } }
}'
```

### 2.4 Otras vías en código

| Vía                                     | Estado                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `vercel.json` (`routes` con `mitigate`) | **No sirve para Log.** Solo `challenge` y `deny` ([Custom Rules](https://vercel.com/docs/vercel-firewall/vercel-waf/custom-rules)).                                                                                                                                                                                                                                                                                                                                                                                                  |
| API REST                                | Existe `PATCH /v1/security/firewall/config?projectId=…` con cuerpo `{ "action": "rules.insert", "id": null, "value": { name, active, conditionGroup, action } }` ([referencia](https://vercel.com/docs/rest-api/security/update-firewall-configuration)). La página generada **no muestra un ejemplo con `log` y su lista de variantes parece mal etiquetada** (las descripciones de las variantes no coinciden con sus `action`; remite al OpenAPI para 18 variantes más). **No verificado**: usar la CLI, que sí está documentada. |
| Terraform                               | Recurso `vercel_firewall_config` ([API del Firewall](https://vercel.com/docs/vercel-firewall/firewall-api)). La guía oficial de Terraform muestra reglas con `action = "deny"` y `conditions` con `type`/`op`/`value`; **ningún ejemplo con `log`** ([guía](https://vercel.com/kb/guide/firewall-terraform-configuration)) y la página del registro de Terraform no se pudo leer. Excesivo para una sola regla.                                                                                                                      |
| SDK de Vercel                           | Hay métodos de seguridad ([API del Firewall](https://vercel.com/docs/vercel-firewall/firewall-api)); no los revisé.                                                                                                                                                                                                                                                                                                                                                                                                                  |

**Conclusión sobre el código:** la CLI es el camino reproducible. No hay una configuración declarativa versionada en el repo para `log`; el estado vive en Vercel. Conviene anotar la orden en `docs/` o `AGENTS.md` si se usa.

### 2.5 Dónde se ven los hits, retención y coste

- **Firewall > Traffic** (proyecto): filtrar por regla y por la pestaña de acción; agrupar por **User Agents**, IP, ruta, ASN, JA4 y país ([Firewall Observability](https://vercel.com/docs/vercel-firewall/firewall-observability)). La ventana «live» es de 10 minutos y el valor por defecto, el último día.
- **CLI:** `vercel firewall traffic list --dimension user-agent --rule <id>` y `--user-agent <ua>` (dimensiones `ip, ja4, asn, user-agent, path, rule, host, bot, country, action`) ([CLI](https://vercel.com/docs/cli/firewall)).
- **Retención en Pro:** la CLI dice que `traffic list` «tiene éxito en todos los planes» para las últimas 24 h y que **`--since 7d` exige Observability Plus**, que amplía la retención a **30 días** ([CLI](https://vercel.com/docs/cli/firewall)). La tabla de Observability da para Pro **1 día** de retención sin Plus y **30 días** con Plus ([Observability Plus](https://vercel.com/docs/observability/observability-plus)). Es decir, **sin Plus hay que mirar el Firewall cada día o no se conserva el dato**.
- **Observability Plus:** 1,20 USD por millón de eventos (CDN Requests, invocaciones de funciones, etc.); por defecto activado en equipos creados o actualizados a Pro desde el 2026-04-03; en equipos anteriores hay que activarlo en Billing ([Observability Plus](https://vercel.com/docs/observability/observability-plus)). Para unos pocos miles de visitas al mes el importe es, en la práctica, céntimos; **no verificado el consumo real** (cada petición de página, imagen y fichero estático cuenta como evento CDN según la lista de eventos de [Observability](https://vercel.com/docs/observability)).
- **Drains** (envío a un sistema externo): la acción Log envía los detalles a Drains ([Firewall concepts](https://vercel.com/docs/vercel-firewall/firewall-concepts)). **El precio y la disponibilidad de Drains en Pro no los verifiqué.** Con Priority projects los drains incluyen `botName`, `botCategory`, `botStatus` ([Firewall Observability](https://vercel.com/docs/vercel-firewall/firewall-observability)), pero Priority cuesta **200 USD por proyecto al mes** ([Uso y precios](https://vercel.com/docs/vercel-firewall/vercel-waf/usage-and-pricing)): no compensa.
- **Coste de la regla:** ninguno. «Las funciones del Firewall disponibles en todos los planes son gratuitas», incluidas las reglas personalizadas ([Uso y precios](https://vercel.com/docs/vercel-firewall/vercel-waf/usage-and-pricing)). Una regla Log no bloquea, así que no reduce el consumo de CDN.

### 2.6 ¿Hay algo ya hecho en Vercel?

- **Conjunto gestionado «AI Bots»** (todos los planes): inactivo por defecto («Allow»). Se puede poner en **Log** o **Deny**, **por categoría** (AI Crawlers: entrenamiento; AI Assistants: respuestas a acciones del usuario o búsquedas). Vercel mantiene la lista ([Bot Management](https://vercel.com/docs/bot-management), [Managed rulesets](https://vercel.com/docs/vercel-firewall/vercel-waf/managed-rulesets)). Pasos: Firewall > Rules > sección Bot Management > icono Configure > Log. CLI: `vercel firewall managed-rulesets update ai-bots --group ai-crawlers --action log --yes` y `... --group ai-assistants --action log --yes`, luego `vercel firewall publish`. Es **por categoría, no por bot**, y no incluye Bingbot (categoría `search_engine_crawler` en el directorio). `Google-Agent` figura como categoría `agent`; **no verifiqué si el conjunto AI Bots lo cubre**.
- **Pestaña AI Traffic** de Observability: muestra peticiones de bots de IA en el tiempo, separadas en rastreadores y asistentes, y las rutas más pedidas, las que dieron error y las pedidas como Markdown; no requiere regla ([Insights](https://vercel.com/docs/observability/insights)). La retención en Pro sin Plus es de 1 día (tabla de [Observability Plus](https://vercel.com/docs/observability/observability-plus)). El detalle por bot concreto en CDN Requests se anuncia para Observability Plus.
- **Bot Management > dashboard por bots verificados:** en todos los planes se ven los bots verificados (Googlebot, Bingbot…); los no verificados quedan enmascarados salvo en Priority ([Bot Management](https://vercel.com/docs/bot-management)). Un `curl -A "OAI-SearchBot/1.4"` no está verificado (no viene de las IP del bot), así que la prueba de llm-agents.md (`O3`) **puede no aparecer con su nombre de bot en estas vistas** y sí en la regla por user agent: otra razón para la regla propia.
- **Reglas con `bot_name` / `bot_category`** requieren Priority (200 USD/mes): no aplica.

**Recomendación para A3:** regla personalizada con Log (2.3) **y** mirar la pestaña AI Traffic. No activar a la vez el conjunto gestionado AI Bots en Log: ambos registran la misma petición y solo se atribuye a la última regla que coincide.

### 2.7 Pasos para el dueño (dashboard)

1. Abrir vercel.com, el proyecto del sitio, **Firewall**.
2. **⋯ > Configure > Add New… > Rule**.
3. Nombre `Log AI crawlers`; condición **User Agent** + **Matches expression** + la regex de 2.2; **Then: Log**.
4. **Save Rule > Review Changes > Publish**.
5. **Verificar:** `curl -A "OAI-SearchBot/1.4" -I https://www.fernandagutierrez.es/` y, en **Firewall > Traffic**, elegir la regla `Log AI crawlers` y agrupar por **User Agents** (probar primero con la ventana «live» de 10 minutos).
6. **Seguimiento:** revisar a diario o activar Observability Plus si se quiere conservar 30 días; anotar los resultados en `llm-agents.md` (backlog A3).

## 3. Pregunta 1: Pirsch desde nuestro dominio

### 3.1 Lo que carga hoy el sitio

`src/components/analytics.tsx` carga `https://api.pirsch.io/pa.js` con `data-code` y `data-disable-outbound-links`. El `pa.js` descargado hoy (11 757 bytes) toma los destinos de tres atributos, con estos valores por defecto: `data-hit-endpoint` → `https://api.pirsch.io/hit`, `data-event-endpoint` → `https://api.pirsch.io/event`, `data-session-endpoint` → `https://api.pirsch.io/session`. Qué envía (leído en el propio script):

- **Page view:** `GET {hit-endpoint}?nc=…&code=<código>&url=…&t=<título>&ref=…&w=…&h=…` más `tag_<clave>=…`, por `XMLHttpRequest`.
- **Evento:** `navigator.sendBeacon(endpoint, JSON)` con `identification_code`, `url`, `title`, `referrer`, `screen_width`, `screen_height`, `tags`, `event_name`, `event_duration`, `event_meta`, `non_interactive`.
- El navegador no envía su IP en ningún parámetro: **la IP es la de la conexión** o la que el servidor intermedio reenvíe.

La página de [frontend integration](https://docs.pirsch.io/get-started/frontend-integration) **no documenta** `data-hit-endpoint` ni los otros dos; solo remite a las páginas de proxy y dominios. Los nombres aparecen en el README del proxy en Go (`data-hit-endpoint="/p/pv"`, `data-event-endpoint="/p/e"`, `data-session-endpoint="/p/s"`, `src="/p/pa.js"`) ([pirsch-go-proxy](https://github.com/pirsch-analytics/pirsch-go-proxy)) y en el `pa.js`.

El `pa.js` de Pirsch responde con `cache-control: max-age=86400` y la cabecera `accept-ch` pidiendo client hints (`Sec-CH-UA…`), medido el 2026-11-28.

### 3.2 Qué ofrece Pirsch oficialmente

[Página de proxy](https://docs.pirsch.io/advanced/proxy):

- **PHP** ([pirsch-php-proxy](https://github.com/pirsch-analytics/pirsch-php-proxy)), **Go** en un VPS o Docker ([pirsch-go-proxy](https://github.com/pirsch-analytics/pirsch-go-proxy)), **Cloudflare Workers** (gratis hasta 100 000 peticiones al día; [guía](https://docs.pirsch.io/advanced/cf-workers)) e integración comunitaria para Astro.
- Beneficio declarado: peticiones de primera parte, «menos probables de ser bloqueadas por bloqueadores de anuncios y scripts».
- La página **no documenta** cabeceras de IP ni proxies de confianza; remite a los READMEs.
- Hay un proxy en un **servidor propio** (no serverless): fuera de lo que ofrece este sitio (ADR 0001).

[Dominios personalizados](https://docs.pirsch.io/advanced/custom-domains):

- Función del plan **Plus** (12 USD/mes en la página de precios del 2026-11-28; el Standard cuesta 6 USD; [precios](https://pirsch.io/pricing)).
- Pasos: dominio o subdominio sin usar, registro TXT de verificación, dos registros A y dos AAAA hacia las IP que muestra Pirsch, y cambiar `api.pirsch.io` en el `src` del script y los endpoints del fragmento. Pirsch emite el certificado.
- Sobre bloqueadores: «las peticiones no se hacen directamente a pirsch.io»; **no afirma que eviten bloqueadores**. Con DNS directo a Pirsch la IP del visitante es la de la conexión, así que **no hay problema de IP**.
- **No verificado:** que Adblock Plus deje pasar un subdominio como `stats.fernandagutierrez.es` con las rutas `/pa.js`, `/hit` y `/event`. Las listas de filtros se actualizan solas y pueden bloquear por nombre de ruta; la propia guía de Workers avisa de evitar «tracker», «event» y «hit» en las rutas.

### 3.3 Cómo obtiene Pirsch la IP y el user agent

- **API del servidor** (`POST /api/v1/hit`, `/event`, `/session`): la IP y el user agent van **en el cuerpo**, campos `ip` y `user_agent` (obligatorios junto con `url`); opcionales y recomendados: `accept_language`, `sec_ch_ua*`, `sec_ch_width`, `sec_ch_viewport_width`, `referrer`, `title`, `screen_width`, `screen_height`, `tags`. Pirsch dice que no almacena la IP ([API v1](https://docs.pirsch.io/api-sdks/api-v1), [integración backend](https://docs.pirsch.io/get-started/backend-integration)).
- **Detrás de un proxy:** la solución de problemas avisa de que «bloqueamos ciertas direcciones IP» y de que si un balanceador o proxy no reenvía bien se recibe la IP del servidor en lugar de la del visitante; «los proxies inversos suelen pasar la IP real en `X-Forwarded-For`» ([solución de problemas](https://docs.pirsch.io/get-started/troubleshooting)). La FAQ añade que «bloqueamos la mayoría de IP de centros de datos para proteger a nuestros clientes del spam» y que una cabecera con la IP reenviada «puede estar corrompida» ([FAQ](https://docs.pirsch.io/faq)). Las peticiones aceptadas «se procesan de forma asíncrona y pueden descartarse si creemos que son de un bot». **Esto significa que una petición con la IP de Vercel puede descartarse en silencio.**
- **Qué cabeceras lee el proxy oficial en Go** (lectura del código fuente `pkg/proxy/ip.go`, **no ejecutado**): por orden, `CF-Connecting-IP`, `True-Client-IP`, `X-Forwarded-For` (toma la **última** entrada), `Forwarded` (RFC 7239) y `X-Real-IP`; descarta direcciones privadas, de loopback y no especificadas; si ninguna sirve, usa la IP de la conexión. Admite una lista opcional de subredes de proxies de confianza (`config.toml`: «una lista opcional de subredes en CIDR restringe qué proxies son de confianza») ([ip.go](https://github.com/pirsch-analytics/pirsch-go-proxy/blob/master/pkg/proxy/ip.go), [config.toml](https://github.com/pirsch-analytics/pirsch-go-proxy/blob/master/config/config.toml)). Mi lectura del fichero sugiere que la lista de cabeceras activa se asigna en otro punto; **no verificado cómo**.
- **Worker de Cloudflare** de Pirsch ([worker.js](https://github.com/pirsch-analytics/demo/blob/master/cloudflare-workers/worker.js)): usa solo `CF-Connecting-IP` como `ip`, `User-Agent` como `user_agent` y reenvía `Accept-Language` y los client hints a `api.pirsch.io/api/v1/{hit,event,session}`.
- **El patrón común es el mismo:** el proxy lee la IP del visitante de la cabecera de su propia plataforma y la **pone en el cuerpo** de la API. Ninguno reenvía la petición del navegador tal cual al endpoint `/hit`.
- **Lo que no está documentado:** si el endpoint de navegador `/hit` de Pirsch lee `X-Forwarded-For` o `X-Real-IP`. **No verificado.**

### 3.4 `rewrites` de Next.js o Vercel hacia un origen externo

- Vercel permite reescribir a un origen externo (actúa como proxy inverso). Reenvía `x-real-ip` y `x-forwarded-for` («la IP pública del visitante»), `x-forwarded-host` y `x-forwarded-proto` sin configuración extra ([Rewrites](https://vercel.com/docs/rewrites)). `x-forwarded-for` es la IP pública del cliente; Vercel **sobrescribe** `X-Forwarded-For` y no reenvía IP externas (prevención de suplantación); `x-real-ip` es idéntico; un proxy de confianza para IP personalizadas es solo **Enterprise** ([Request headers](https://vercel.com/docs/headers/request-headers)). No somos un proxy detrás de otro: somos el primer salto, así que el valor es la IP del visitante.
- **`user-agent`:** la documentación de Vercel que leí **no afirma** si se reenvía o se sustituye en los rewrites externos; `host` sí se describe como el dominio de acceso. **No verificado** para `user-agent`.
- **Caché:** Vercel respeta `cache-control`, `CDN-Cache-Control` y `Vercel-CDN-Cache-Control` del origen en rewrites externos **por defecto en proyectos creados desde el 2026-04-06**, en antiguos si está activado en el dashboard o con la cabecera `x-vercel-enable-rewrite-caching`; antes no se cacheaban ([Rewrites](https://vercel.com/docs/rewrites)). No sé si este proyecto es anterior (**no verificado**). Para el script (`max-age=86400`) es deseable; para `/hit` y `/event` **no debe cachearse** (`x-vercel-enable-rewrite-caching: 0`).
- **Observabilidad:** los rewrites externos aparecen en la pestaña **External Origins** de Observability y en drains ([Rewrites](https://vercel.com/docs/rewrites)).
- **En `next.config.ts`:** la documentación de Vercel habla de rewrites externos en `vercel.json` y remite a la de Next.js para rewrites internos; **no verifiqué** que un `rewrites()` de `next.config.ts` hacia una URL externa se trate igual en Vercel (Next.js lo permite, pero el comportamiento de cabeceras/caché descrito arriba está documentado para `vercel.json`). Por eso el borrador de 3.6 usa `vercel.json`.
- **Veredicto:** el rewrite **debería** conservar la IP según Vercel, pero **Pirsch dice que no soporta los rewrites de Vercel** y no documenta qué cabecera lee su endpoint de navegador. Es **no verificado y no soportado por el proveedor**. Sirve para el **script** (un fichero estático sin IP) y no para `/hit` ni `/event`.

### 3.5 Route Handler que reenvía con la IP explícita

Es el patrón que usa el proxy oficial (3.3), implementado con una función de Vercel.

- **Qué recibe:** el `GET` de page view y el `POST` (`sendBeacon`) de evento de `pa.js` (3.1).
- **Qué hace:** lee la IP de `x-forwarded-for` (Vercel la rellena con la IP pública del visitante; es el primer valor) y el `user-agent`, y llama a `https://api.pirsch.io/api/v1/hit` o `/event` con una **clave de acceso** (`pa_…`, solo escritura) ([guía de la API](https://docs.pirsch.io/api-sdks/api-guide-v1): las claves «solo pueden usarse para enviar datos»; no necesitan token previo). La cabecera exacta (`Authorization: Bearer pa_…`) **no se verifica**: la documentación solo dice que el token OAuth va como `Bearer <token>`.
- **Sin límite de peticiones documentado** en los endpoints de recogida («actualmente no tienen límite, pero podría cambiar») ([guía de la API](https://docs.pirsch.io/api-sdks/api-guide-v1)).
- **Riesgo:** la ruta es pública y escribe datos en el panel; cualquiera podría enviar eventos falsos. Es el mismo riesgo que ya tiene `pa.js` con el código de identificación público, pero sin la comprobación de dominio que haga Pirsch (**no verificado**).
- **Cabeceras de client hints:** el script pide `accept-ch` desde el origen que lo sirve, así que al servirlo desde nuestro dominio el navegador enviará `Sec-CH-*` a nuestras rutas; hay que reenviarlas en el cuerpo (como hace el proxy en Go).

### 3.6 Configuración exacta propuesta (borrador sin ejecutar)

**1) Servir `pa.js` desde nuestro dominio con un rewrite** (no lleva IP). `vercel.json` nuevo en la raíz del repo:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rewrites": [{ "source": "/m/s.js", "destination": "https://api.pirsch.io/pa.js" }]
}
```

Nombres de ruta neutros (`/m/s.js`, `/m/v`, `/m/e`): la guía de Workers de Pirsch desaconseja «tracker», «event» y «hit». Si el proyecto es anterior al 2026-04-06, el script no se cachea salvo que se añada la cabecera `x-vercel-enable-rewrite-caching: 1` para esa ruta (3.4); no es grave (11 KB).

**2) Cambiar el componente** `src/components/analytics.tsx` (solo el `<Script>`):

```tsx
<Script
  id='pianjs'
  src='/m/s.js'
  data-code={code}
  data-hit-endpoint='/m/v'
  data-event-endpoint='/m/e'
  data-disable-outbound-links
/>
```

`id='pianjs'` debe mantenerse: `pa.js` se busca a sí mismo con `#pianjs` (confirmado en el script).

**3) Route Handlers** `src/app/m/v/route.ts` (page view, `GET`) y `src/app/m/e/route.ts` (evento, `POST`):

```ts
// src/app/m/v/route.ts (borrador)
const API = 'https://api.pirsch.io/api/v1'

function visitorHeaders(request: Request) {
  const h = request.headers
  return {
    ip: h.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '',
    user_agent: h.get('user-agent') ?? '',
    accept_language: h.get('accept-language') ?? '',
    sec_ch_ua: h.get('sec-ch-ua') ?? '',
    sec_ch_ua_mobile: h.get('sec-ch-ua-mobile') ?? '',
    sec_ch_ua_platform: h.get('sec-ch-ua-platform') ?? '',
    sec_ch_ua_platform_version: h.get('sec-ch-ua-platform-version') ?? '',
    sec_ch_width: h.get('sec-ch-width') ?? '',
    sec_ch_viewport_width: h.get('sec-ch-viewport-width') ?? ''
  }
}

export async function GET(request: Request) {
  const key = process.env.PIRSCH_ACCESS_KEY
  const q = new URL(request.url).searchParams
  if (!key || !q.get('url')) return new Response(null, { status: 204 })

  const tags: Record<string, string> = {}
  for (const [k, v] of q) if (k.startsWith('tag_')) tags[k.slice(4)] = v

  await fetch(`${API}/hit`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...visitorHeaders(request),
      url: q.get('url'),
      title: q.get('t') ?? '',
      referrer: q.get('ref') ?? '',
      screen_width: Number(q.get('w')) || 0,
      screen_height: Number(q.get('h')) || 0,
      tags
    })
  })
  return new Response(null, { status: 204 })
}
```

`src/app/m/e/route.ts` sería igual con `POST`, leyendo el cuerpo (`sendBeacon` envía el JSON como texto: usar `JSON.parse(await request.text())`) y llamando a `${API}/event` con `event_name`, `event_duration`, `event_meta`, `non_interactive`, `url`, `title`, `referrer` y los mismos campos de `visitorHeaders`.

- Variable de entorno nueva: `PIRSCH_ACCESS_KEY` (clave de acceso de solo escritura, creada en el panel de Pirsch en Integración; solo en Vercel Production). Añadirla a la tabla de variables de `AGENTS.md`.
- Comprobar en el primer despliegue: que la clave se acepta como `Bearer`, que `url` debe ser absoluta (el script la envía absoluta) y que `ref` llega ya decodificado (el script la codifica con `encodeURIComponent`; el proxy en Go la pasa tal cual, **no verificado** si hay que decodificarla).
- Los Route Handlers `GET` que leen cabeceras son dinámicos en Next.js; **no verificado** el comportamiento exacto en Next 16 (comprobar con `pnpm build` que la ruta sale como dinámica).

### 3.7 Coste en Vercel Pro (unos pocos miles de páginas vistas al mes)

- **Invocaciones de funciones:** Pro no incluye cuota: se facturan **bajo demanda a 0,60 USD por millón**, descontadas del crédito mensual de uso de Pro (**importe del crédito: no verificado**, no aparece en las páginas leídas) ([Fluid compute](https://vercel.com/docs/functions/usage-and-pricing)). Con 5 000 páginas vistas y unos pocos eventos, son unas 6 000 a 10 000 invocaciones al mes: del orden de **0,006 USD**.
- **CPU activa y memoria:** se facturan por tiempo de ejecución con precio regional (Frankfurt: 0,184 USD por hora de CPU y 0,0152 USD por GB-hora). La función espera la respuesta de Pirsch (E/S): la CPU activa se pausa mientras espera, la memoria no. A esta escala, céntimos o menos. No hay región de funciones configurada en el repo que yo haya comprobado.
- **Rewrite externo:** no encontré un precio propio para rewrites externos; usan CDN Requests y Fast Data Transfer, incluidos en el modelo Pro ([CDN pricing](https://vercel.com/docs/manage-cdn-usage)). **No verificado** si un rewrite externo consume Fast Origin Transfer.
- **Observability Plus** (si está activo) cuenta cada invocación y petición CDN como evento a 1,20 USD por millón: irrelevante a esta escala.
- **Límites de funciones:** no encontré un límite por invocaciones en Pro que se acerque a este uso. **No verificado.**
- **Pirsch:** el endpoint de recogida por API no tiene límite de peticiones documentado y cada hit cuenta igual que ahora contra las 10 000 páginas vistas del plan Standard ([precios](https://pirsch.io/pricing)). Servir más tráfico real (visitantes con bloqueador) puede acercarlo a ese límite.

### 3.8 Cómo verificar que Pirsch recibe la IP real

1. **Sitio de prueba:** crear en Pirsch (el plan Standard admite hasta 50 sitios) un sitio de prueba con su propio código y su propia clave de acceso, y desplegar el cambio en una **vista previa** (hoy `Analytics` solo carga en producción: habría que permitirlo temporalmente en la vista previa con el código de prueba, o hacer la prueba en producción con el código real y tener cuidado de los datos).
2. **Desde un móvil con datos del operador** (no desde la Wi-Fi del estudio ni VPN, que Pirsch avisa que pueden ser descartadas) abrir el sitio, navegar a dos páginas y pulsar un botón de WhatsApp.
3. **En el panel de Pirsch** mirar **Geolocalización** (país, región, ciudad): debe verse **España** y la ciudad del operador, **no** el país de la región de Vercel (p. ej., Alemania por Frankfurt, Irlanda por Dublín o EE. UU. por `iad1`) ni «desconocido». Pirsch deriva la ubicación de la IP.
4. **Comprobar la unicidad:** abrir el sitio desde dos dispositivos distintos con redes distintas: el panel debe mostrar **dos visitantes**. Si aparecen como uno (o ninguno), el servidor está enviando la misma IP: el identificador es un hash de IP, user agent, fecha y sal ([analytics.md](./analytics.md)).
5. **Con Adblock Plus activo**, en las herramientas de desarrollo del navegador (pestaña Red) comprobar que `/m/s.js`, `/m/v` y `/m/e` **no se bloquean** y que el panel registra la visita; repetir con uBlock Origin y con las listas por defecto de Brave, porque Adblock Plus no es el único.
6. **Si el panel solo muestra «datos de Vercel» o no registra nada:** revisar los registros de la función (`vercel logs`) y que `x-forwarded-for` llega con valor.

### 3.9 Aspecto legal (AEPD)

- La investigación anterior ([analytics.md, 3.1](./analytics.md)) concluye que la AEPD no ha dicho nada de herramientas sin cookies con hash de IP y user agent, y que el EDPB considera que el artículo 5(3) puede aplicarse aunque no haya cookies. Eso no cambia por servir el script desde nuestro dominio: la guía de la AEPD sobre medición de audiencia (enero 2024) se fija en la **finalidad, los datos, el contrato y la retención**, no en el dominio desde el que se sirve el script ([guía AEPD](https://www.aepd.es/guias/guia-cookies-analiticas-externas.pdf), citada en analytics.md).
- **Sobre eludir un bloqueador que el usuario instaló:** busqué en AEPD y EDPB (también un resultado de consulta pública de terceros) y **no encontré ninguna fuente primaria** que trate los proxies de primera parte para analítica ni la elusión de bloqueadores. Lo único cercano es una **aportación de parte** (no del EDPB) a la consulta de las Directrices 2/2023, que sostiene que su ámbito convierte el consentimiento en un bloqueador de anuncios de facto ([consulta pública](https://www.edpb.europa.eu/system/files/documents/webform/public_consultation_reply/fcp_consultazione_lineeguida_edpb.def_.pdf)). **No es una posición oficial.** Cualquier conclusión sobre si saltarse un bloqueador agrava el riesgo (por ejemplo, como indicio de que el usuario no quería ser medido) es **opinión, no fuente**: queda para la consulta legal ya pendiente.
- Dos efectos prácticos, sin base jurídica en las fuentes: el visitante con bloqueador es precisamente quien manifestó, por un medio técnico, que no quiere medición; y la IP del visitante pasa por una función nuestra (tratamiento adicional que hay que describir en la política de privacidad L2, aunque no se almacene).

### 3.10 ADR 0001

El [ADR 0001](../adr/0001-content-as-code-without-backend.md) dice: «No hay backend, base de datos ni CMS. La única dependencia externa en tiempo de ejecución es la API de Google Places». Un Route Handler de reenvío sin estado **no es una base de datos ni un CMS**, pero **sí es código de servidor que se ejecuta en cada visita y una segunda dependencia externa en tiempo de ejecución** (la API de Pirsch). Dos consecuencias:

- Hay que registrar una **adenda o un ADR nuevo** (p. ej. 0002) que lo acepte expresamente, igual que en la investigación previa sobre una ruta MCP; y actualizar la frase de `AGENTS.md` («The only runtime dependency is Google Places API»).
- Una avería de Pirsch o de la función no afecta a las páginas (la medición falla en silencio), pero conviene que la función **no devuelva error al navegador** y use `after()` o una respuesta inmediata si se quiere no retrasar nada (no verificado en Next 16).

## 4. Recomendación final

**Pregunta 1.** **Hacerlo solo con la vía de Route Handler y solo si el dueño valora recuperar los visitantes con bloqueador.** No usar un rewrite para `/hit` y `/event` (no soportado por Pirsch, sin fuente que garantice la IP). Alternativa sin código: dominio personalizado de Pirsch Plus (+6 USD/mes), que no tiene problema de IP pero cuyo efecto sobre bloqueadores no está documentado. En ambos casos **no hay garantía de que Adblock Plus deje pasar la medición**; se sabrá solo con la prueba de 3.8. Si no se quiere asumir una función de servidor, **no hacerlo** y aceptar el sesgo (sub-recuento de visitantes con bloqueador); el sitio no vende nada y el dato clave (clics en WhatsApp por Service) se pierde justo en ese grupo.

**Pregunta 2.** **Hacerlo ya**: una regla personalizada `Log AI crawlers` con la regex de 2.2, creada por dashboard (2.7) o por CLI (2.3), sin coste. Revisar a diario (retención de 1 día en Pro sin Observability Plus) y apuntar los resultados en `llm-agents.md`. Complementarla con la pestaña AI Traffic. `vercel.json` no sirve para esta regla.

## 5. Fuentes

Pirsch

- Proxy: https://docs.pirsch.io/advanced/proxy
- Dominios personalizados: https://docs.pirsch.io/advanced/custom-domains
- Proxy con Cloudflare Workers: https://docs.pirsch.io/advanced/cf-workers
- FAQ (Vercel rewrites, IP de centros de datos): https://docs.pirsch.io/faq
- Solución de problemas: https://docs.pirsch.io/get-started/troubleshooting
- Integración frontend: https://docs.pirsch.io/get-started/frontend-integration
- Integración backend: https://docs.pirsch.io/get-started/backend-integration
- API v1 y guía: https://docs.pirsch.io/api-sdks/api-v1, https://docs.pirsch.io/api-sdks/api-guide-v1
- Precios: https://pirsch.io/pricing
- Proxy en Go: https://github.com/pirsch-analytics/pirsch-go-proxy (`pkg/proxy/ip.go`, `pkg/proxy/handler.go`, `config/config.toml`)
- Proxy en PHP: https://github.com/pirsch-analytics/pirsch-php-proxy
- Worker de Cloudflare: https://github.com/pirsch-analytics/demo/blob/master/cloudflare-workers/worker.js
- `https://api.pirsch.io/pa.js` (descargado y leído el 2026-11-28)

Vercel

- Rewrites: https://vercel.com/docs/rewrites
- Request headers: https://vercel.com/docs/headers/request-headers
- Precios de funciones: https://vercel.com/docs/functions/usage-and-pricing
- CDN y transferencia: https://vercel.com/docs/manage-cdn-usage
- Custom Rules: https://vercel.com/docs/vercel-firewall/vercel-waf/custom-rules
- Configuración de reglas: https://vercel.com/docs/vercel-firewall/vercel-waf/rule-configuration
- Uso y precios del WAF (límites): https://vercel.com/docs/vercel-firewall/vercel-waf/usage-and-pricing
- Conceptos del Firewall (acción Log): https://vercel.com/docs/vercel-firewall/firewall-concepts
- Observabilidad del Firewall: https://vercel.com/docs/vercel-firewall/firewall-observability
- Conjuntos gestionados (AI Bots): https://vercel.com/docs/vercel-firewall/vercel-waf/managed-rulesets
- Bot Management y directorio de bots verificados: https://vercel.com/docs/bot-management
- CLI `vercel firewall`: https://vercel.com/docs/cli/firewall
- API REST del Firewall: https://vercel.com/docs/vercel-firewall/firewall-api, https://vercel.com/docs/rest-api/security/update-firewall-configuration
- Guía de Terraform: https://vercel.com/kb/guide/firewall-terraform-configuration
- Observability e Insights (AI Traffic, External Origins): https://vercel.com/docs/observability, https://vercel.com/docs/observability/insights
- Observability Plus (retención y precio): https://vercel.com/docs/observability/observability-plus

Legal

- Aportación de parte a la consulta de las Directrices 2/2023 del EDPB (no es posición del EDPB): https://www.edpb.europa.eu/system/files/documents/webform/public_consultation_reply/fcp_consultazione_lineeguida_edpb.def_.pdf
- El resto de fuentes de la AEPD y del EDPB, en [analytics.md](./analytics.md).
