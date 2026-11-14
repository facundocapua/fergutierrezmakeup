# Descubrimiento, indexación y uso del sitio por asistentes y agentes de IA

Investigación del 2026-11-12. Fuentes primarias únicamente (documentación oficial y repositorios de especificaciones); la lista está al final. Lo que no se pudo verificar en una fuente primaria se marca como **no verificado**. Los hechos que cambian rápido llevan fecha.

## 1. Resumen ejecutivo

- Para aparecer en ChatGPT, Claude, Perplexity, Gemini/AI Overviews y Apple **no hay marcado ni archivo especial**: Google lo dice expresamente (no hace falta schema ni archivos "para IA"). Lo que cuenta es que el buscador de cada empresa pueda rastrear e indexar las páginas, y que el contenido esté en HTML.
- Cada empresa separa tres tipos de tráfico: **entrenamiento** (GPTBot, ClaudeBot, Google-Extended, Applebot-Extended), **búsqueda** (OAI-SearchBot, Claude-SearchBot, PerplexityBot, Googlebot, Applebot) y **fetch a pedido del usuario** (ChatGPT-User, Claude-User, Perplexity-User, Google-Agent). Los fetch a pedido suelen **ignorar robots.txt**. El robots.txt actual (`allow: /` para todos) ya permite todo; falta decidir de forma explícita la política de entrenamiento.
- El sitio ya tiene lo básico (sitemap, robots, canonical, JSON-LD de `BeautySalon` y migas). Faltan: JSON-LD de Service y Class, perfiles de negocio coherentes (Google Business Profile, Bing, Apple), medición y un enlace de Booking a WhatsApp más robusto.
- `llms.txt` es una propuesta abierta sin evidencia primaria de que los buscadores de IA lo usen; Google dice que no hace falta. Es barato pero especulativo.
- Para que un agente **inicie un Booking** desde ChatGPT/Claude, la opción realista es un **servidor MCP remoto, de solo lectura y sin autenticación**, que devuelva un link `wa.me` ya armado. Claude lo admite como conector personalizado ("No sign in"); ChatGPT lo admite como MCP personalizado y, para el directorio público, exige verificación, política de privacidad y revisión. No encontré una vía documentada equivalente para Gemini. Choca con el espíritu del ADR 0001 (sin backend), así que requiere decisión del dueño.
- Descartados para este sitio: NLWeb (necesita LLM y base vectorial), A2A (protocolo entre agentes) y los protocolos de comercio de OpenAI (feeds de producto y checkout; aquí no se vende nada). WebMCP es todavía un borrador con prueba de origen en Chrome 149: esperar.
- Orden propuesto: lo barato y probado (robots, perfiles de negocio, medición, HTML legible, JSON-LD, link de WhatsApp) antes que lo especulativo (llms.txt, MCP, WebMCP).

### Decisiones del dueño (2026-11-14)

- **Entrenamiento permitido.** Todos los rastreadores, también los de entrenamiento, pueden leer el sitio. O1 está hecho.
- **Sin servidor MCP (O8 descartado).** Solo llega a quien instale el conector a mano, y el sitio no es tan conocido como para que alguien lo haga. La vía desde el chat de ChatGPT, Gemini o Claude, sin instalar nada, es que el asistente encuentre el sitio, lo lea y devuelva el link de WhatsApp que ya está en el HTML: eso depende de O1, O4, O5 y O6.
- **WebMCP como experimento (O9).** Es JavaScript en la página y no necesita backend, así que encaja con el ADR 0001. Solo lo usa un agente que ya está navegando el sitio en el navegador, no el chat de un asistente, y la API puede cambiar. Se hará después de O4–O6.
- **Mensajes de opciones fijas.** Cualquier herramienta que arme un link de Booking (hoy, el experimento WebMCP) recibe el Service o la Class por id y devuelve el mensaje definido en `src/data`, como mucho con campos cortos opcionales (nombre, fecha deseada). Nunca texto libre del agente: así Fernanda no recibe precios o condiciones inventadas.

## 2. Estado actual del sitio

Leído en el repo:

| Elemento            | Dónde                                                          | Qué hay                                                                                                                                                                                  |
| ------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| robots.txt          | `src/app/robots.ts`                                            | `userAgent: '*', allow: '/'` y la URL del sitemap. Sin reglas por bot.                                                                                                                   |
| Sitemap             | `src/app/sitemap.ts`                                           | 7 rutas (`/`, `/servicios`, `/servicios/{social,novias,cejas}`, `/clases`, `/portfolio`) con prioridad y frecuencia. Sin `lastModified`.                                                 |
| Metadatos           | `src/lib/metadata.ts`                                          | `buildPageMetadata`: title, description, canonical y Open Graph por página.                                                                                                              |
| JSON-LD del Studio  | `src/lib/structured-data.ts`, usado solo en `src/app/page.tsx` | `BeautySalon` con `@id`, dirección, `geo`, `telephone`, `email`, `sameAs` (Facebook, Instagram, TikTok), `founder`, `openingHoursSpecification` (lun-sáb 10:00-20:00).                   |
| JSON-LD de migas    | `src/lib/structured-data.ts`, `src/components/breadcrumb.tsx`  | `BreadcrumbList` por página.                                                                                                                                                             |
| Link de WhatsApp    | `src/lib/whatsapp.ts`                                          | `buildWhatsAppLink(url, message)` = `${url}?text=${encodeURIComponent(message)}`. La base es `CONTACT_DETAILS.socialNetworks.whatsapp` = `https://wa.me/34623807060` (formato correcto). |
| Mensajes de Booking | `src/data/services.ts`, `src/data/classes.ts`                  | Un mensaje fijo por Service y por Class (p. ej. "Hola, me gustaría reservar un maquillaje social."). El Bridal Makeup pide Quote, no Booking.                                            |
| Datos               | `src/data/*`                                                   | Servicios (con `href`), Classes (nombre, sesiones, duración), contacto, marcas, portfolio. Sin precios (backlog C2 pendiente).                                                           |
| Reseñas             | `src/lib/google-reviews.ts`                                    | Places API, mostradas en la home. No hay `aggregateRating` en el JSON-LD (ver sección 3.2: correcto).                                                                                    |
| Rendering           | AGENTS.md                                                      | Páginas estáticas con Server Components: el contenido está en el HTML inicial, sin JS necesario.                                                                                         |
| Medición            | `docs/backlog.md` L1                                           | No hay analítica (GA se quitó en la migración; L1 pendiente con consentimiento).                                                                                                         |

Huecos relevantes para agentes: no hay JSON-LD de `Service` ni de Class; `openingHoursSpecification` es un objeto, no un array; las páginas internas solo tienen migas; no hay `lastModified`; no hay política explícita por bot.

## 3. Hallazgos

### 3.1 Cómo cada asistente encuentra y cita sitios

Tabla de rastreadores (verificada en la documentación de cada empresa):

| Empresa    | User agent                                        | Propósito                                                                                                                                                      | robots.txt                                                                                         | Fuente                                                                |
| ---------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| OpenAI     | `OAI-SearchBot`                                   | Búsqueda de ChatGPT. Si se bloquea, el sitio no sale en respuestas de búsqueda (puede salir solo como enlace de navegación). Cambios tardan ~24 h.             | Se respeta                                                                                         | [OpenAI bots][openai-bots]                                            |
| OpenAI     | `GPTBot`                                          | Entrenamiento de modelos fundacionales                                                                                                                         | Se respeta; bloquearlo indica "no entrenar"                                                        | [OpenAI bots][openai-bots]                                            |
| OpenAI     | `ChatGPT-User`                                    | Acciones iniciadas por el usuario (visitar una página, GPT Actions). No decide la inclusión en búsqueda.                                                       | "Las reglas de robots.txt pueden no aplicar"                                                       | [OpenAI bots][openai-bots]                                            |
| Anthropic  | `ClaudeBot`                                       | Recolección que puede contribuir al entrenamiento                                                                                                              | Se respeta                                                                                         | [Anthropic crawler][anthropic-crawl]                                  |
| Anthropic  | `Claude-SearchBot`                                | Indexado para mejorar los resultados de búsqueda                                                                                                               | Se respeta                                                                                         | [Anthropic crawler][anthropic-crawl]                                  |
| Anthropic  | `Claude-User`                                     | Acceso cuando una pregunta del usuario lo requiere                                                                                                             | Documentado como respetado; bloquearlo reduce la visibilidad en búsquedas dirigidas por el usuario | [Anthropic crawler][anthropic-crawl]                                  |
| Perplexity | `PerplexityBot`                                   | Mostrar y enlazar sitios en resultados; "no se usa para entrenar modelos fundacionales"                                                                        | Permitirlo para aparecer                                                                           | [Perplexity bots][perplexity-bots]                                    |
| Perplexity | `Perplexity-User`                                 | Fetch cuando la pregunta lo necesita                                                                                                                           | "Generalmente ignora" robots.txt                                                                   | [Perplexity bots][perplexity-bots]                                    |
| Google     | `Googlebot`                                       | Rastreo de Search, que alimenta AI Overviews y AI Mode                                                                                                         | Siempre obedece                                                                                    | [Common crawlers][google-crawlers], [AI features][google-ai-features] |
| Google     | `Google-Extended`                                 | Token de robots.txt (no es un rastreador): controla entrenamiento de Gemini y grounding en Gemini Apps/Vertex. No afecta a Search ni al ranking.               | Se respeta                                                                                         | [Common crawlers][google-crawlers]                                    |
| Google     | `Google-Agent` (fetcher a pedido)                 | Agentes en infraestructura de Google que navegan y actúan a pedido del usuario                                                                                 | "Generalmente ignora"                                                                              | [User-triggered fetchers][google-fetchers]                            |
| Apple      | `Applebot`                                        | Alimenta Spotlight, Siri y Safari; puede ayudar a entrenar modelos de Apple                                                                                    | Se respeta; si no hay regla para Applebot pero sí para Googlebot, sigue la de Googlebot            | [Applebot][applebot]                                                  |
| Apple      | `Applebot-Extended`                               | No rastrea; solo controla si el contenido ya rastreado se usa para entrenar                                                                                    | Se respeta; aparece en búsqueda igual                                                              | [Applebot][applebot]                                                  |
| Microsoft  | `Bingbot` (Copilot se apoya en el índice de Bing) | **No verificado**: la página de rastreadores de Bing no devolvió contenido y no encontré una fuente primaria de Microsoft sobre el uso del índice por Copilot. | n/d                                                                                                | n/d                                                                   |

Puntos adicionales verificados:

- **AI Overviews y AI Mode**: Google dice que la página debe estar indexada y ser elegible para mostrarse con snippet, y que "no hay requisitos adicionales", "ni schema.org especial", ni "archivos de texto para IA". Los controles son los de Search (`nosnippet`, `max-snippet`, `noindex`). Fuente: [AI features][google-ai-features] (sin fecha visible en la página).
- **robots.txt no es noindex**: una URL bloqueada puede seguir indexada sin contenido ([robots.txt, Google][google-robots]). Para sacar algo de resultados se usa `noindex`.
- **Señal de "no entrenar" estandarizada**: Anthropic respeta desde 2026-10-30 una señal basada en el borrador IETF aipref y Google planea soportar `__usage_ai-training` a inicios de 2027 ([Anthropic][anthropic-crawl], [Google][google-crawlers]). Es incipiente; hoy la herramienta fiable sigue siendo el robots.txt por bot.
- **Verificación de IPs**: OpenAI, Anthropic, Perplexity y Apple publican listas de IP (p. ej. `openai.com/searchbot.json`, `claude.com/crawling/bots.json`, `perplexity.ai/perplexitybot.json`). Anthropic advierte que bloquear por IP impide leer robots.txt.
- **Bing Webmaster Tools** tiene un informe "AI Performance" (vista previa pública anunciada el 2026-02-10; "Topics Portfolio (Beta)" el 2026-10-13). Solo vi títulos y fechas, no el contenido. Fuente: [Bing Webmaster Blog][bing-blog].

Conclusión: bloquear entrenamiento y permitir búsqueda es técnicamente posible con robots.txt, pero un `Disallow` **no frena** a los fetchers a pedido (ChatGPT-User, Perplexity-User, Google-Agent). Para un sitio que quiere ser encontrado y citado, el riesgo está en bloquear por accidente (p. ej. con un desafío de bots en el firewall).

### 3.2 Datos estructurados y formatos

Lo que sí está respaldado:

- **LocalBusiness**: Google exige `name` y `address`; recomienda `geo` (5 decimales), `openingHoursSpecification` (acepta objeto o array; `opens`/`closes` en hh:mm:ss), `telephone`, `url`, `priceRange`; pide el **subtipo más específico** y no admite `additionalType`. Fuente: [Local business][google-localbusiness]. `BeautySalon` ya es un subtipo; el sitio hace servicio en estudio y a domicilio, de modo que `areaServed` tiene sentido (schema.org lo define en [Service][schema-service] y [LocalBusiness][schema-localbusiness]; **no verificado** que algún asistente lo use).
- **Reseñas propias**: Google dice que un negocio **no puede** marcar con `review`/`aggregateRating` las reseñas sobre sí mismo (aunque vengan de un widget de Google Business); la función es para sitios que reúnen reseñas de otros negocios. Fuente: [Review snippet][google-review]. El JSON-LD actual no las incluye: mantenerlo así. Las reseñas siguen siendo útiles como texto visible y con la atribución a Google Maps.
- **Course**: Google **retiró** la documentación de "Course info" y esos tipos "ya no se muestran" en Search (entrada del 2025-09-09 en [Course info][google-course]; la galería actual solo lista "Course list"). `Course`/`CourseInstance` sigue existiendo en schema.org, pero el beneficio en Google no existe; solo podría servir a otros consumidores (**sin evidencia**).
- **Galería de funciones de Google** (25 funciones, incluyendo Local business, Organization, Breadcrumb, Event, Review snippet): [Search gallery][google-gallery]. No hay función específica de `Service`: sirve como contexto para entender la página, no para un resultado enriquecido.
- **ReserveAction / potentialAction con EntryPoint**: existe en schema.org ([ReserveAction][schema-reserve]; `target` acepta EntryPoint o URL y se cuelga de `potentialAction`). Su descripción habla de reservar "un objeto concreto" (mesa, habitación). No encontré documentación de Google, OpenAI ni Anthropic que consuma esta acción para un link a WhatsApp: **especulativo**. Encajaría mejor `ContactAction`/`CommunicateAction`, pero tampoco hay evidencia de consumo.
- **Apple** usa `isAccessibleForFree: false` para excluir contenido del contexto de respuestas generativas ([Applebot][applebot]); no aplica a este sitio.
- **Google Business Profile**: la propia ficha de Google es la fuente de las reseñas del sitio. No obtuve una página primaria sobre cómo Gemini o AI Mode usan la ficha, por lo que su peso en respuestas locales de IA es **no verificado**; aun así es el activo local con más respaldo en la documentación de Search (consistencia de nombre, dirección y teléfono con el sitio). Lo mismo para Bing Places y Apple Business Connect: **no verificado** en esta investigación.
- **`llms.txt`**: propuesta de Jeremy Howard (2024-09-03), v2 modificada el 2026-08-10. Define un H1, un resumen en cita y listas de enlaces; admite versiones `.md` de las páginas. La página afirma "miles de sitios" y uso en documentación de OpenAI, Anthropic y Gemini; **no afirma** que los buscadores de IA lo lean para citar sitios de consumo. Google dice que no hace falta ningún archivo para IA ([AI features][google-ai-features]). Estado: propuesta comunitaria, no estándar; evidencia de impacto en citaciones: ninguna en fuentes primarias. Fuente: [llmstxt.org][llmstxt].
- **HTML limpio y semántico**: respaldado indirectamente. Applebot advierte que bloquear JS/CSS puede impedir el renderizado ([Applebot][applebot]); Google exige indexación normal. Sirve ya el contenido en HTML estático.

### 3.3 Cómo puede actuar un agente (Booking hasta WhatsApp)

| Opción                                                                               | Madurez (2026-11-12)                                                                                                                                                                                                                                                                                                                                                                                                          | Qué requiere                                                                                                                                                                                                                                                  | Encaje con un sitio estático                                                                                                                                     |
| ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Servidor MCP remoto** (Streamable HTTP)                                            | La especificación vigente es la 2026-07-28; Streamable HTTP = POST a un único endpoint, respuestas JSON o SSE ([transports][mcp-transports]).                                                                                                                                                                                                                                                                                 | Una ruta pública HTTPS. En Vercel: `mcp-handler` v2 en una ruta de Next.js App Router (`app/api/mcp/route.ts`), Node 20+, Fluid compute ([Vercel][vercel-mcp]). OAuth es opcional.                                                                            | Es una función serverless, no un backend con datos: puede leer `src/data` en build. Contradice la letra de "sin backend" del ADR 0001 (hace falta un ADR nuevo). |
| **Conector personalizado en Claude**                                                 | Disponible en todos los planes (Free limitado a 1). Opción "No sign in" para servidores sin autenticación. Las conexiones salen de la infraestructura de Anthropic, así que el servidor debe ser público. Fuente: [Claude custom connectors][claude-connectors].                                                                                                                                                              | Que cada usuaria lo añada a mano con la URL. No encontré un proceso de envío al directorio de conectores en la fuente consultada.                                                                                                                             | Funciona para quien conozca la URL; no da descubrimiento masivo.                                                                                                 |
| **MCP personalizado en ChatGPT / directorio**                                        | Se añade en chatgpt.com/plugins ("Add custom MCP server"; la política de cuenta/espacio aplica; Streamable HTTP, típico `/mcp`) ([Connect][openai-connect]). Para el directorio público: organización verificada, URLs de web, soporte, privacidad y términos, exactamente 5 casos positivos y 3 negativos, vídeo demo; se admite "sin autenticación"; OpenAI escanea el servidor cada día ([Submission][openai-submission]). | Verificación individual o de empresa, política de privacidad HTTPS, revisión humana. Disponibilidad por país configurable; **no verificado** que cubra España. La documentación habla de "plugins" donde antes se decía "Apps SDK" ([Apps SDK][openai-apps]). | Posible, pero la carga de revisión es desproporcionada para una marca personal, y el nombre/estado del programa cambió recientemente.                            |
| **Gemini**                                                                           | Sin vía documentada hallada en fuentes primarias para que un tercero publique una acción para Gemini Apps. **No verificado**. Lo documentado es que `Google-Agent` navega a pedido del usuario e ignora robots.txt ([fetchers][google-fetchers]).                                                                                                                                                                             | n/d                                                                                                                                                                                                                                                           | Depende de que el HTML sea navegable.                                                                                                                            |
| **Agentes de navegación** (ChatGPT agent, Claude in Chrome, Gemini en Chrome, Comet) | Claude in Chrome: extensión de Chrome para planes de pago; lee la página, hace clic, escribe y completa formularios ([Claude in Chrome][claude-chrome]). No pude abrir la ayuda de ChatGPT agent (403).                                                                                                                                                                                                                       | Nada del lado del sitio.                                                                                                                                                                                                                                      | Es la vía que **ya funciona hoy**: un botón con `<a href="https://wa.me/...">` bien rotulado es lo único que necesita.                                           |
| **WebMCP**                                                                           | Borrador de Community Group (2026-11-11), no es estándar W3C ([spec][webmcp]). En Chrome: prueba de origen desde Chrome 149; flag `chrome://flags/#enable-webmcp-testing`; publicado 2026-05-18, actualizado 2026-10-07 ([Chrome][chrome-webmcp]).                                                                                                                                                                            | JS en la página (`registerTool`) o anotaciones declarativas en formularios.                                                                                                                                                                                   | El sitio no tiene formularios; esperar.                                                                                                                          |
| **NLWeb** (Microsoft)                                                                | Proyecto Python de código abierto; sin releases publicados; "CI/CD aún no incluido"; usa LLM y almacén vectorial (Qdrant, Azure AI Search, etc.); cada instancia es también un servidor MCP ([repo][nlweb]).                                                                                                                                                                                                                  | Infraestructura propia, LLM, base vectorial.                                                                                                                                                                                                                  | No encaja: más costoso que el problema.                                                                                                                          |
| **A2A**                                                                              | Protocolo abierto entre agentes (Linux Foundation, Apache 2.0, donado por Google) ([repo][a2a]). La página no menciona asistentes de consumo.                                                                                                                                                                                                                                                                                 | n/d                                                                                                                                                                                                                                                           | No aplica: no hay vía para que ChatGPT/Gemini/Claude lo usen con un negocio pequeño.                                                                             |
| **Protocolos de comercio de OpenAI**                                                 | Documentación sobre checkout agéntico, pago delegado y feeds de producto ([commerce][openai-commerce]). La página no dice si los servicios sin pago entran.                                                                                                                                                                                                                                                                   | Feed de producto, implementar checkout.                                                                                                                                                                                                                       | No aplica: no se vende nada.                                                                                                                                     |

**Robustez del link de WhatsApp.** Según la ayuda de WhatsApp ("How to use click to chat", [FAQ][whatsapp-faq]; la página no devolvió su cuerpo al fetch directo y confirmé el contenido por el resultado de búsqueda del mismo dominio), el formato es `https://wa.me/<número en formato internacional>?text=<texto codificado>`: sin `+`, ceros, paréntesis ni guiones, y el texto en URL-encoding (espacios como `%20`). Meta también documenta enlaces cortos `wa.me/message/CODE` que guardan el mensaje en el servidor y ocultan el número ([QR codes and short links][whatsapp-qr]); eso exige la API de WhatsApp Business, fuera de alcance aquí. **No encontré un límite documentado de longitud** del parámetro `text`: mantener mensajes cortos y evitar datos personales en la URL. El código actual (`encodeURIComponent`, número 34623807060) cumple el formato; lo que falta es validarlo con pruebas y ofrecer el número visible como alternativa por si el agente no puede abrir `wa.me`.

### 3.4 Medición

- **Referrers**: Vercel Web Analytics filtra por Referrers y por Pages; los **UTM** requieren Web Analytics Plus o Enterprise ([Vercel filtering][vercel-filtering], actualizada 2026-09-16). Los asistentes envían referrer de forma desigual: **no hay documentación primaria** de qué dominios (chatgpt.com, perplexity.ai, etc.) envían referrer o añaden UTM, así que hay que observarlo empíricamente.
- **Hits de rastreadores**: no los ve la analítica de navegador. El Vercel Firewall permite una acción **Log** (la petición pasa y se registra en Firewall/Observability y se envía a Drains) ([Firewall concepts][vercel-firewall]). Una regla de log por user agent (`OAI-SearchBot`, `ChatGPT-User`, `Claude-User`, `PerplexityBot`, `Applebot`, `Google-Agent`) da el conteo sin afectar a nadie. Los user agents se pueden falsificar; verificar con las listas de IP publicadas.
- **Google**: AI Overviews/AI Mode se miden dentro de Search Console; no pude abrir la página que lo confirma (404), por lo que queda **no verificado**.
- **Bing**: informe "AI Performance" en Bing Webmaster Tools ([blog][bing-blog]).
- **Conversión real**: el cierre ocurre en WhatsApp, donde el sitio no ve nada. El dato medible en el sitio es el clic en el botón de WhatsApp (evento personalizado de Vercel o GA4), dependiente de L1 (consentimiento).

## 4. Objetivos

Formato como `docs/backlog.md`. Prioridad: P1 hacer pronto, P2 valioso, P3 opcional. Esfuerzo: S horas, M uno o dos días, L más.

| #   | Objetivo                                                                                                            | Prioridad | Esfuerzo |
| --- | ------------------------------------------------------------------------------------------------------------------- | --------- | -------- |
| O1  | Los rastreadores de búsqueda IA pueden leer todo el sitio y hay una política explícita de entrenamiento (**hecho**) | P1        | S        |
| O2  | Perfiles de negocio coherentes con el sitio (Google, Bing, Apple)                                                   | P1        | S        |
| O3  | Saber si llegan visitas y rastreos desde asistentes                                                                 | P1        | S-M      |
| O4  | Los hechos clave están en HTML visible y un agente de navegación puede iniciar el Booking (**hecho**)               | P2        | S        |
| O5  | JSON-LD completo para Services y Classes                                                                            | P2        | M        |
| O6  | Link de WhatsApp robusto y con prueba (**hecho**)                                                                   | P2        | S        |
| O7  | `llms.txt` y versiones Markdown generadas desde `src/data`                                                          | P3        | S        |
| O8  | ~~Servidor MCP remoto de solo lectura con herramienta de link de Booking~~ (**descartado**)                         | —         | —        |
| O9  | Experimento WebMCP: herramienta de Booking registrada en la página                                                  | P3        | S        |

### O1: Los rastreadores de búsqueda IA pueden leer todo el sitio y hay una política explícita de entrenamiento (P1, S)

- **Por qué**: aparecer en respuestas depende de poder ser rastreado por `OAI-SearchBot`, `Claude-SearchBot`, `PerplexityBot`, `Googlebot`, `Applebot` ([OpenAI][openai-bots], [Anthropic][anthropic-crawl], [Perplexity][perplexity-bots]). Hoy se permite todo por omisión, pero no es una decisión documentada, y un cambio de firewall podría bloquear sin querer.
- **Qué hacer**: en `src/app/robots.ts` declarar reglas por grupo: permitir los bots de búsqueda y de usuario; para los de entrenamiento (`GPTBot`, `ClaudeBot`, `Google-Extended`, `Applebot-Extended`) aplicar la decisión del dueño (ver sección 5). Mantener el sitemap. No añadir `Disallow` para los fetchers a pedido: no sirve. Comprobar en el proyecto de Vercel que ninguna regla de desafío (Challenge) afecte a estos bots ([Firewall concepts][vercel-firewall]).
- **Verificar**: `curl -s https://www.fernandagutierrez.es/robots.txt`; `curl -A "OAI-SearchBot/1.4" -I` a cada ruta del sitemap devuelve 200; el reflejo de cambios en OpenAI tarda ~24 h.
- **Dependencias**: decisión del dueño sobre entrenamiento.
- **Estado (2026-11-14)**: hecho. Se permite también el entrenamiento, así que basta la regla `*` con `allow: /`; la decisión queda documentada en `src/app/robots.ts`. Pendiente fuera del repo: comprobar en Vercel que ninguna regla de Firewall desafía a estos bots.

### O2: Perfiles de negocio coherentes con el sitio (P1, S)

- **Por qué**: la ficha de Google ya alimenta las reseñas del sitio y las búsquedas locales de Google; la consistencia de nombre, dirección, teléfono y horario con el JSON-LD es la base de la presencia local ([Local business][google-localbusiness]). Peso en respuestas de IA: no verificado (sección 3.2).
- **Qué hacer**: revisar que la ficha de Google Business Profile coincida con `src/data/contact-details.ts` (nombre "Fer Gutierrez MakeUp", dirección, teléfono, horario, categoría, enlace del sitio, servicios). Crear/reclamar la ficha de Bing Places y la de Apple Business Connect (**no verificado en esta investigación**; confirmar requisitos en su documentación al hacerlo). Registrar el sitio en Bing Webmaster Tools para ver "AI Performance".
- **Verificar**: búsqueda de la marca en Google Maps, Bing Maps y Apple Maps con datos idénticos; Bing Webmaster Tools muestra el sitio verificado.
- **Dependencias**: acceso de la Artist a esas cuentas.

### O3: Saber si llegan visitas y rastreos desde asistentes (P1, S-M)

- **Por qué**: sin esto no se puede evaluar ningún otro objetivo. Hoy no hay ninguna medición (backlog L1).
- **Qué hacer**: (a) completar L1 (analítica con consentimiento) o usar Vercel Web Analytics y revisar el panel Referrers; (b) añadir una regla de Firewall con acción **Log** por user agent de la tabla 3.1 y revisarla en Observability; (c) evento de clic en los botones de WhatsApp; (d) revisar Search Console y Bing "AI Performance" una vez al mes; (e) anotar en este documento qué referrers aparecen realmente.
- **Verificar**: visitar el sitio con `curl -A "OAI-SearchBot/1.4"` y ver el evento en el Firewall; el clic de prueba aparece como evento.
- **Dependencias**: L1 y L2 del backlog (aviso de privacidad) para cualquier cookie; los UTM exigen plan Plus ([Vercel][vercel-filtering]).

### O4: Los hechos clave están en HTML visible y un agente de navegación puede iniciar el Booking (P2, S)

- **Por qué**: los agentes de navegación (Claude in Chrome lee, hace clic y rellena formularios: [ayuda][claude-chrome]) y los rastreadores solo ven lo que está en el DOM. Es la vía que funciona hoy sin infraestructura.
- **Qué hacer**: comprobar que cada página de Service y de Class muestra en texto: qué es, duración, sesiones, lugar (estudio/domicilio, presencial/online), zona, horario y cómo reservar; que los CTA son `<a href>` reales (no `onClick`) con nombre accesible claro ("Reservar Maquillaje Social por WhatsApp"); que el número aparece también como texto. Un solo `h1` por página y listas reales para las listas. Aprovechar la revisión de contenido C1/C7/C8 del backlog.
- **Verificar**: `curl` de cada página sin JS y comprobar que el contenido y los `href` están; prueba manual con Claude in Chrome o ChatGPT agent pidiendo "reserva una clase de automaquillaje" y observar que llega al link correcto.
- **Dependencias**: copia final (C1, C8).
- **Estado (2026-11-14)**: hecho. `src/components/booking-details.tsx` muestra en cada página de Service y en `/clases` dónde (estudio o domicilio; presencial u online), el horario y el número de WhatsApp como texto enlazado al Booking, todo derivado de `src/data`. Los CTA tienen nombre accesible con el Service ("Reservar Maquillaje eventos por WhatsApp"). Sin datos nuevos: falta la duración del Diseño de cejas (C6) y la copia final (C1, C8). Pendiente: la prueba manual con un agente de navegación.

### O5: JSON-LD completo para Services y Classes (P2, M)

- **Por qué**: contexto legible por máquina para entender qué ofrece el negocio; no genera resultados enriquecidos (Google no tiene función para `Service`; ver [galería][google-gallery]) y Google dice que no es necesario para IA ([AI features][google-ai-features]). Beneficio para otros consumidores: no verificado.
- **Qué hacer**: en `src/lib/structured-data.ts`: (a) `openingHoursSpecification` como array y `opens`/`closes` en hh:mm:ss; (b) añadir `areaServed` (Costa del Sol / Benalmádena, Málaga) y `knowsAbout`/`hasOfferCatalog` apuntando por `@id` a cada Service y Class; (c) `buildServiceStructuredData` con `@type: Service`, `provider: { '@id': '/#studio' }`, `serviceType`, `areaServed`, `url`; usarlo en `/servicios/*` y para las Classes (`Service` con `serviceType` "Clase de maquillaje", o `Course` + `CourseInstance` con `courseMode` online/presencial, sabiendo que Google ya no muestra Course info: [aviso][google-course]); (d) **no** añadir `aggregateRating` ni `review` ([Review snippet][google-review]); (e) no inventar precios (`Offer` solo cuando se decida C2); (f) opcional y especulativo: `potentialAction` con `ContactAction`/`ReserveAction` y `EntryPoint` al link de WhatsApp ([ReserveAction][schema-reserve]). Derivar todo de `src/data` para evitar duplicar.
- **Verificar**: validador de Rich Results / validador de schema.org; que `name`, `url` y `telephone` coincidan con la ficha de Google (O2).
- **Dependencias**: decisión de precios (C2) si se quieren `Offer`.

### O6: Link de WhatsApp robusto y con prueba (P2, S)

- **Por qué**: es el final de todo Booking, también el que construiría un agente (O8). El formato está definido por [WhatsApp][whatsapp-faq]: sin `+`, ceros, paréntesis ni guiones; texto en URL-encoding.
- **Qué hacer**: en `src/lib/whatsapp.ts`, derivar el número de `phoneE164` quitando `+` en vez de depender de una cadena escrita a mano; validar que el número cumpla `^\d{8,15}$`; seguir con `encodeURIComponent` (cubre `¿`, `*` y acentos en UTF-8); acotar el largo del mensaje (sin límite documentado: **no verificado**, por eso se recomienda un tope conservador, p. ej. 500 caracteres); mantener el número visible como texto alternativo; añadir un test unitario con los mensajes de `src/data` (no existe framework de tests documentado en AGENTS.md; decidir cuál). No poner datos personales en el mensaje.
- **Verificar**: el test decodifica el `text` y compara con el mensaje; abrir manualmente el link en móvil y en WhatsApp Web.
- **Dependencias**: ninguna.
- **Estado (2026-11-14)**: hecho. `buildWhatsAppLink(message)` deriva el número de `phoneE164`, valida el formato y limita el mensaje a 500 caracteres; un mensaje inválido rompe el build. Se quitó `socialNetworks.whatsapp` de `src/data/contact-details.ts` para tener una sola fuente. Tests con Vitest en `tests/unit/whatsapp.test.ts` (`pnpm test`, también en CI). Pendiente: el número como texto visible junto a los botones entra en O4.

### O7: `llms.txt` y versiones Markdown generadas desde `src/data` (P3, S)

- **Por qué**: barato y reversible, pero **sin evidencia primaria** de efecto en citaciones; Google dice que no hace falta ([AI features][google-ai-features]); la propuesta ([llmstxt.org][llmstxt]) es de la comunidad y el único uso que documenta es de documentación técnica.
- **Qué hacer**: ruta `src/app/llms.txt/route.ts` que genere el archivo desde `SERVICES`, `CLASSES` y `CONTACT_DETAILS` (H1, resumen en cita, listas H2 de Services y Classes con enlaces). Opcional: `.md` de cada página. Generar siempre desde los datos para que no se desincronice.
- **Verificar**: `curl https://www.fernandagutierrez.es/llms.txt` cumple el formato; medir con O3 si algún bot lo pide (los logs dirán si alguien lo lee).
- **Dependencias**: O3 para poder juzgar si sirve; si no se ve ninguna petición en 3 meses, retirarlo.

### O8: Servidor MCP remoto de solo lectura con herramienta de link de Booking (descartado)

> Descartado el 2026-11-14: solo llega a quien instale el conector a mano. Se deja el análisis como referencia.

- **Por qué**: es la única vía para "iniciar el Booking desde dentro de Claude o ChatGPT y terminar en WhatsApp". Es la opción más madura de las evaluadas, pero hoy llega a quien añada el conector a mano (Claude: [custom connectors][claude-connectors]) o pase la revisión del directorio de ChatGPT ([Submission][openai-submission]). Gemini: sin vía documentada.
- **Qué hacer**: ADR nuevo (ver sección 5) y ruta `src/app/api/mcp/route.ts` con `mcp-handler` v2 ([Vercel][vercel-mcp]), sin autenticación, herramientas de solo lectura: `list_services`, `list_classes`, `get_class(id)`, `get_studio_info`, `build_booking_link({ kind: 'service'|'class', id })`. La última devuelve **solo** los mensajes ya definidos en `src/data` (enumerados por id) más, como mucho, un campo corto opcional y saneado; así no hay texto libre arbitrario enviado hacia WhatsApp. Para Bridal Makeup devolver el mensaje de Quote. Reutilizar `buildWhatsAppLink` (O6). Regla de WAF con límite de tasa en `/api/mcp` ([Vercel][vercel-mcp]). Añadir al directorio solo si el dueño lo decide (requiere verificación, política de privacidad, vídeo y 5+3 casos de prueba).
- **Verificar**: MCP Inspector contra local y preview (`pnpm dlx @modelcontextprotocol/inspector`); añadir el conector en Claude con "No sign in" y pedir "quiero reservar una clase de automaquillaje"; ChatGPT: "Add custom MCP server".
- **Dependencias**: O6; decisión del dueño; L2 (política de privacidad) si se envía al directorio de ChatGPT.

### O9: Experimento WebMCP: herramienta de Booking registrada en la página (P3, S)

- **Por qué**: es la única forma de "acción" que no exige que la usuaria instale nada y no necesita backend. Llega solo a agentes que navegan el sitio en un navegador con WebMCP; la API es un borrador (2026-11-11) en prueba de origen en Chrome 149 ([spec][webmcp], [Chrome][chrome-webmcp]) y puede cambiar.
- **Qué hacer**: un Client Component pequeño, cargado en el layout, que si existe la API registre con `registerTool` herramientas de solo lectura: `list_services`, `list_classes` y `build_booking_link({ kind, id, name?, preferredDate? })`. La última devuelve `buildWhatsAppLink` con el mensaje de `src/data` y, como mucho, los campos cortos opcionales (ver decisiones). Sin la API, no hace nada. Token de prueba de origen como variable de entorno. Revisar la especificación vigente antes de implementar.
- **Verificar**: Chrome con `chrome://flags/#enable-webmcp-testing`, llamar a la herramienta desde un agente o desde la consola y abrir el link resultante.
- **Dependencias**: O4–O6. Volver a revisar el estado de WebMCP y qué agentes lo usan antes de empezar.

## 5. Riesgos y preguntas abiertas

**Privacidad**

- Un link de WhatsApp no envía nada al servidor del sitio; solo abre una conversación. Un servidor MCP (O8) sí recibe peticiones: no pedir nombre, teléfono ni fechas, no registrar el texto libre y mencionarlo en la política de privacidad (L2).
- La Artist ya tiene su teléfono y su email público en el sitio y en el JSON-LD; eso aumenta la exposición a scraping de IA, pero ya era público.

**Abuso o spam**

- Un `build_booking_link` público solo devuelve un enlace; el riesgo real es que alguien lo use para llenar WhatsApp de mensajes basura, y eso requiere que el usuario envíe el mensaje (el link no lo envía). Aun así: sin texto libre o con un tope corto, y límite de tasa en WAF. Vercel recomienda combinar autorización y reglas de red ([Vercel][vercel-mcp]).
- Los fetchers a pedido ignoran robots.txt: no hay forma fiable de impedir que un agente lea o siga el link.

**Sincronización con `src/data`**

- Todo lo nuevo (JSON-LD, `llms.txt`, MCP) debe generarse desde `src/data`, nunca duplicar textos. Aun así, cada cambio de Service, Class, horario o mensaje afecta a: la ficha de Google, Bing Places y Apple (manuales, **no** se sincronizan solos). Convención sugerida: lista de verificación en el PR cuando cambien `contact-details.ts` o `services.ts`.
- El ADR 0001 dice "sin backend". Una ruta MCP es una función sin estado que lee datos del build; conviene un ADR corto que lo registre como excepción acotada.

**Decisiones del dueño**

1. ¿Permitir el uso del contenido para entrenar modelos (`GPTBot`, `ClaudeBot`, `Google-Extended`, `Applebot-Extended`) o no? No afecta a la visibilidad en búsqueda (Google lo aclara para `Google-Extended`; Apple y OpenAI separan los controles).
2. ¿Mostrar precios (C2)? Habilita `Offer` y respuestas de IA con precio; hoy los asistentes dirán "consultar".
3. ¿Se quiere invertir en el servidor MCP (O8) y en el directorio de ChatGPT, sabiendo que llega a pocas personas hoy?
4. ¿Quién mantiene las fichas de Google, Bing y Apple?
5. Afirmaciones: PRODUCT.md avisa de no publicar "la única en Málaga" sin confirmar; vale también para el JSON-LD y `llms.txt`.

**Preguntas abiertas (no resueltas con fuentes primarias)**

- Si Microsoft Copilot usa el índice de Bing y qué rastreador/controles aplican (no se obtuvo la documentación).
- Cómo Gemini, AI Mode y ChatGPT usan la ficha de Google Business/Maps en respuestas locales.
- Si algún asistente consume `ReserveAction`, `areaServed` o `llms.txt` para citar o actuar.
- Qué referrers y UTM envía cada asistente.
- Límite de largo del parámetro `text` de `wa.me`.
- Disponibilidad en España de las apps/plugins de ChatGPT y de una vía para Gemini.
- Si Search Console separa AI Mode de la búsqueda normal (la página consultada devolvió 404).

## 6. Fuentes

Consultadas el 2026-11-12.

[openai-bots]: https://developers.openai.com/api/docs/bots
[openai-connect]: https://developers.openai.com/apps-sdk/deploy/connect-chatgpt
[openai-submission]: https://developers.openai.com/apps-sdk/deploy/submission
[openai-apps]: https://developers.openai.com/apps-sdk/
[openai-commerce]: https://developers.openai.com/commerce
[anthropic-crawl]: https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler
[claude-connectors]: https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp
[claude-chrome]: https://support.claude.com/en/articles/12012173-getting-started-with-claude-in-chrome
[perplexity-bots]: https://docs.perplexity.ai/guides/bots
[google-crawlers]: https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers
[google-fetchers]: https://developers.google.com/search/docs/crawling-indexing/google-user-triggered-fetchers
[google-ai-features]: https://developers.google.com/search/docs/appearance/ai-features
[google-robots]: https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt
[google-localbusiness]: https://developers.google.com/search/docs/appearance/structured-data/local-business
[google-review]: https://developers.google.com/search/docs/appearance/structured-data/review-snippet
[google-gallery]: https://developers.google.com/search/docs/appearance/structured-data/search-gallery
[google-course]: https://developers.google.com/search/docs/appearance/structured-data/course-info
[applebot]: https://support.apple.com/en-us/119829
[bing-blog]: https://blogs.bing.com/webmaster/
[schema-reserve]: https://schema.org/ReserveAction
[schema-service]: https://schema.org/Service
[schema-localbusiness]: https://schema.org/LocalBusiness
[llmstxt]: https://llmstxt.org/
[mcp-transports]: https://modelcontextprotocol.io/specification/latest/basic/transports
[vercel-mcp]: https://vercel.com/docs/mcp/deploy-mcp-servers-to-vercel
[vercel-filtering]: https://vercel.com/docs/analytics/filtering
[vercel-firewall]: https://vercel.com/docs/vercel-firewall/firewall-concepts
[webmcp]: https://webmachinelearning.github.io/webmcp/
[chrome-webmcp]: https://developer.chrome.com/docs/ai/webmcp
[nlweb]: https://github.com/microsoft/NLWeb
[a2a]: https://github.com/a2aproject/A2A
[whatsapp-faq]: https://faq.whatsapp.com/5913398998672934
[whatsapp-qr]: https://developers.facebook.com/documentation/business-messaging/whatsapp/qr-codes

Notas sobre la verificación: `schema.org/Service` y `schema.org/LocalBusiness` se citan solo por su existencia y no se abrieron en esta sesión (no se usaron para afirmaciones de comportamiento). Las páginas de WhatsApp, Search Console (AI), ChatGPT agent y Bing crawlers no devolvieron su cuerpo o dieron error al descargarlas; lo que se dice de ellas está marcado en el texto.
