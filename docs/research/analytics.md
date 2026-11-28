# Analítica web ligera como alternativa a Google Analytics 4

Investigación del 2026-11-28. Fuentes primarias únicamente (AEPD, EDPB, BOE, documentación y páginas de precios de cada proveedor, Vercel, Next.js y repositorios); la lista está al final. Lo que no se pudo verificar en una fuente primaria se marca como **no verificado**. Los hechos que cambian rápido (precios, límites de plan) llevan fecha. Los tamaños de script los medí yo el 2026-11-28 descargando cada archivo y comprimiéndolo con `gzip -9` (ver 3.3).

Este documento no es asesoría jurídica. El apartado 3.1 separa lo que dicen los textos oficiales de lo que sigue siendo zona gris; la decisión final sobre el riesgo es del dueño (y, idealmente, de su asesor legal).

## 1. Resumen ejecutivo

- **Sí se puede medir sin GA4 y con muy poco código.** Los requisitos (páginas vistas, referrers, UTM, evento de clic en WhatsApp con el Service o Class) los cubren varias herramientas de pago bajo (6 a 9 USD al mes) o gratuitas (Umami Cloud Hobby, GoatCounter). El script de GA4 pesa unos **156 KB gzip** frente a **1,3 a 4,8 KB** de las alternativas ligeras.
- **Sobre el banner de cookies en España, lo establecido es esto:** el artículo 22.2 de la LSSI exige consentimiento para almacenar o acceder a información del equipo del usuario, salvo lo estrictamente necesario. La AEPD publicó en enero de 2024 una guía específica (_Uso de cookies para herramientas de medición de audiencia_) que **admite exentar de consentimiento** cierta analítica si cumple condiciones estrictas (solo estadísticas anónimas en nombre del editor, sin reutilización por el proveedor, sin cruce entre sitios, 13 meses de vida del identificador, 25 meses de conservación, contrato del artículo 28 RGPD, información en la política de privacidad). Esa guía cubre «cookies o tecnologías similares».
- **Lo que no está establecido (zona gris):** la AEPD **no ha dicho nada** (no encontré nada) sobre herramientas sin cookies que calculan un hash de IP y user agent en el servidor (Plausible, Vercel, Umami, Fathom, Pirsch…). El EDPB (Directrices 2/2023, versión 2.0 adoptada el 2024-10-07) sostiene que el artículo 5(3) de la Directiva ePrivacy se aplica también cuando un script del sitio ordena al navegador enviar información, **aunque no haya cookies**; y deja sin analizar las excepciones. Es decir: «sin cookies» no significa «fuera del 22.2». Un «no necesita banner» del proveedor es marketing, no una conclusión jurídica. La configuración exenta es **defendible, no garantizada**.
- **Recomendación:** **Pirsch Cloud** (Alemania, 6 USD/mes, eventos con metadatos, canal «AI» documentado, CSV y API, script de 3,5 KB gzip) con un evento por clic en WhatsApp y sin banner, **si** el dueño acepta el riesgo residual descrito en 3.1 y se cumplen las garantías de la AEPD. Alternativa: **Plausible Cloud** (UE, 9 USD/mes; mejor documentada en privacidad y con canal «AI Assistants», pero las propiedades de eventos exigen el plan Business de 19 USD). Opción gratuita: **Umami Cloud Hobby**, con la región de datos **no verificada**.
- **Vercel Web Analytics no es una buena opción por sí sola:** en Hobby **no permite eventos personalizados**, los UTM exigen Pro + Web Analytics Plus (+10 USD/mes), y los términos limitan Hobby a uso personal o no comercial.
- Cambios en el backlog si se adopta la recomendación: L1 deja de ser «GA4 con banner»; L2 sigue siendo necesaria pero sin política de cookies; A3 pierde su dependencia dura de L1 (ver sección 7).

### Decisiones del dueño (2026-11-28)

- **Sin banner por ahora**, aceptando el riesgo residual de 3.1. Es una decisión revisable si la AEPD se pronuncia o tras una consulta legal.
- **Pirsch Cloud.** La cuenta ya está creada. El sitio está en el plan **Pro de Vercel**, así que el riesgo de uso comercial en Hobby no aplica.
- **Implementado:** `src/components/analytics.tsx` carga `pa.js` solo en el despliegue de producción y solo si existe `PIRSCH_CODE`. El seguimiento automático de enlaces externos está desactivado, porque enviaría la URL de `wa.me` con el mensaje. `src/components/booking-click-tracker.tsx` envía el evento `WhatsApp click` con un único metadato, `booking`, con el nombre del Service o Class, que se marca en cada enlace con `bookingAttributes` (`src/lib/analytics.ts`). Se usa un listener en el documento y no los atributos `data-pirsch-event`, porque `pa.js` los enlaza una sola vez al cargar la página y no cubre las páginas a las que se llega navegando dentro del sitio (comprobado leyendo `pa.js` el 2026-11-28).
- **Pendiente para cumplir las garantías de la AEPD (M4, M5):** la política de privacidad (L2), el contrato de encargado con Pirsch, la nota de evaluación de configuración y limitar la conservación a 25 meses en el panel de Pirsch.

## 2. Estado actual del sitio

- Sitio estático (Next.js 16, App Router) en Vercel, sin backend ni base de datos por diseño ([ADR 0001][adr-0001]). El plan de Vercel (Hobby o Pro) **no se conoce**.
- No se vende nada. El único «conversión» visible es el clic en un enlace `wa.me` que construye `src/lib/whatsapp.ts` (`buildWhatsAppLink`, `WHATSAPP_CHAT_URL`). El cierre ocurre dentro de WhatsApp, donde el sitio no ve nada.
- Hoy **no se mide nada** (GA se quitó en la migración). Backlog L1 propone GA4 con banner y Consent Mode v2; L2 pide aviso legal y política de privacidad (y de cookies tras L1); A3 mide visitas desde asistentes de IA y depende de L1.
- Convención del repo: las páginas son Server Components y solo el header y el lightbox son Client Components ([AGENTS.md](../../AGENTS.md)). Esto pesa en cómo se envían los eventos de clic (ver 3.4).
- Contexto previo: [docs/research/llm-agents.md](./llm-agents.md), sección 3.4 y objetivo O3 (referrers de asistentes: no hay documentación primaria de qué dominios envían referrer, hay que observarlo).

## 3. Hallazgos

### 3.1 Consentimiento en España: qué está establecido y qué es zona gris

**Establecido (texto oficial)**

1. **LSSI-CE, artículo 22.2.** Los prestadores pueden usar «dispositivos de almacenamiento y recuperación de datos en equipos terminales» a condición de que el destinatario haya dado su consentimiento tras recibir información clara y completa. No impide el almacenamiento o acceso técnico «en la medida que resulte estrictamente necesario, para la prestación de un servicio de la sociedad de la información expresamente solicitado por el destinatario» ([BOE, texto consolidado, actualización publicada 2025-01-23][boe-lssi]). La redacción que devolvió la consulta del BOE aún cita la LO 15/1999 como referencia de protección de datos; es el texto consolidado vigente, pero conviene revisar el literal en el BOE antes de citarlo en un documento legal.
2. **La Guía de cookies de la AEPD** (versión de **mayo de 2024**, la más reciente que encontré; no hallé ninguna posterior a 2026-11-28, aunque esto último es **no verificado** porque el buscador no lo confirma) dice que el 22.2 aplica a cookies y a tecnologías similares (_local shared objects_, _web beacons_…) y «también resulta de aplicación al empleo de técnicas de fingerprinting» ([Guía de cookies, mayo 2024][aepd-guia]). Sobre analítica, la guía general recoge que las cookies de análisis «no están exentas» del consentimiento (cita al GT29), aunque es poco probable que supongan riesgo si son de primera parte, con datos agregados y finalidad estrictamente estadística. Y en su anexo remite a la guía específica de medición de audiencia.
3. **Guía de la AEPD «Uso de cookies para herramientas de medición de audiencia»** (v. enero de 2024, 5 páginas) ([AEPD][aepd-audiencia]). Es el texto clave:
   - Las cookies «o tecnologías similares» de medición de audiencia **«podrían estar exentas de consentimiento bajo ciertas condiciones»**: finalidad estrictamente limitada a la medición exclusiva de la audiencia; tratamiento en nombre exclusivo del editor; solo datos estadísticos anónimos; sin cotejo con otros tratamientos ni transmisión a terceros; sin seguimiento entre sitios o aplicaciones (se excluye un mismo identificador en varios sitios).
   - Quedan fuera de la exención los servicios que **«declaran que reutilizan los datos para otras finalidades»**.
   - La AEPD considera «estrictamente necesarias» únicamente estas mediciones: audiencia página por página; **referente** (interno o externo) por página y agregado diariamente; tipo de dispositivo, navegador y tamaño de pantalla; tiempo de carga; tiempo en página, rebote y profundidad de scroll; **«estadísticas sobre las acciones de los usuarios (clics, selecciones), por página y agregadas diariamente»**; zona geográfica de origen. «Cualquier otro tratamiento […] ha de contar con el consentimiento».
   - **Garantías mínimas:** informar a los usuarios (por ejemplo, en la política de privacidad); vida útil del identificador de **13 meses**, sin ampliarse automáticamente en nuevas visitas; conservación de la información **máximo 25 meses**; revisión periódica.
   - **Si se usa un proveedor:** datos recogidos y almacenados por separado para cada editor; contrato conforme al **artículo 28 RGPD** que prohíba reutilizar los datos, limite el tratamiento a lo anterior, garantice la separación entre editores y que cualquier transferencia fuera de la UE cumple el RGPD; y una **evaluación documentada** (propia o de un tercero) de que la herramienta está configurada para cumplir.
4. **EDPB, Directrices 2/2023** sobre el ámbito técnico del artículo 5(3) de la Directiva ePrivacy, **versión 2.0 adoptada el 2024-10-07** ([EDPB][edpb-2-2023]). Puntos relevantes:
   - Hay «acceso a información» cuando la entidad ordena al navegador, mediante código del lado del cliente, que envíe datos; no importa que no haya cookies. Para identificadores únicos recogidos en sitios web, el apartado 3.5 (§63) concluye que se aplica el artículo 5(3).
   - Seguimiento basado solo en IP (apartado 3.3, §54-55): puede aplicar el 5(3) si la IP procede del equipo terminal del usuario (IPv4 estática del router, IPv6); no si se garantiza lo contrario (por ejemplo, CGNAT).
   - El EDPB **no analiza las excepciones** (§56): recuerda que aplicar el artículo «no significa sistemáticamente» que haga falta consentimiento y que hay que evaluar caso por caso si una excepción es aplicable.

**Zona gris (no resuelto por un regulador, que yo haya encontrado)**

- **Herramientas sin almacenamiento en el dispositivo (hash de IP y user agent en servidor).** No encontré ningún pronunciamiento de la AEPD sobre Plausible, Vercel Web Analytics, Umami, Fathom, Pirsch, etc., ni sobre «hash sin cookies» como categoría. La guía de audiencia habla de «cookies o tecnologías similares», y la guía general extiende el 22.2 al fingerprinting; el EDPB razona que un script que ordena enviar datos del terminal activa el 5(3). Lectura prudente: **el 22.2 puede aplicar aunque no haya cookies**, y entonces hay que cumplir la exención de la AEPD. Lectura favorable: si el único dato del terminal que se usa es lo que viaja en toda petición HTTP (IP, user agent) y no se almacena ni se lee nada del dispositivo, no habría «acceso» en sentido del 22.2. Ninguna de las dos lecturas la ha confirmado la AEPD para estas herramientas.
- **UTM.** La lista cerrada de la AEPD menciona el «referente», pero **no** menciona parámetros de campaña. Que `utm_*` entren en lo «estrictamente necesario» es una interpretación, no un texto.
- **«Agregadas diariamente» y «solo datos estadísticos anónimos».** Las herramientas guardan registros a nivel de evento y sesión (Plausible lo dice: «individual event and session records», [política de datos][plausible-policy]). Si eso cumple «agregado diariamente» y «anónimo» depende de la lectura. Además, la IP sigue siendo dato personal en el RGPD mientras se procesa, aunque luego se descarte; eso exige base jurídica (interés legítimo), información y contrato de encargado, con independencia del consentimiento de cookies (el artículo 28 lo exige expresamente la AEPD para proveedores).
- **Reutilización de datos por el proveedor.** Cada proveedor afirma no reutilizar; la AEPD pide que lo diga el **contrato**. Solo verifiqué que Umami y Fathom publican un DPA ([Umami][umami-privacy], [Fathom][fathom-dpa]); para Pirsch, Plausible, Simple Analytics y Vercel el contenido del DPA es **no verificado**.
- **Retención.** La AEPD fija un máximo de 25 meses. Pirsch anuncia retención «ilimitada» y Plausible no publica periodo ([Pirsch][pirsch-pricing], [Plausible][plausible-policy]): hay que comprobar si se puede acotar o borrar a mano.
- **Vercel Web Analytics** declara no usar cookies de terceros, identificar con un hash de la petición y descartar la sesión a las 24 horas ([Vercel][vercel-privacy]); tampoco hay pronunciamiento de la AEPD sobre él.
- **Sanciones y criterio de inspección.** No investigué resoluciones sancionadoras de la AEPD sobre analítica sin consentimiento: **no verificado**.

**Lo que dice cada proveedor sobre el banner (marketing, no conclusión jurídica):** Plausible: «you do not need cookie banners for analytics» ([política de datos][plausible-policy]); Simple Analytics: «no opt-in is needed» ([qué recogemos][sa-collect]); Umami: el cumplimiento del RGPD «depende de cómo se configure y use» ([FAQ][umami-faq]); Vercel: «diseñado para alinearse con la guía de las autoridades» ([Vercel][vercel-privacy]). Todas son afirmaciones del vendedor.

**GA4 (línea base).** La AEPD excluye de la exención a los servicios que reutilizan los datos para otras finalidades ([guía de audiencia][aepd-audiencia]); la guía no cita a Google por su nombre. Que GA4 requiere consentimiento en este proyecto es la premisa del backlog L1 (banner + Consent Mode v2). Cookies y términos de GA4: **no verificado** en fuente primaria en esta investigación.

### 3.2 Candidatos descartados

| Candidato                                 | Motivo                                                                                                                                                                                                                                             |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cloudflare Web Analytics                  | Su documentación no menciona eventos personalizados ni UTM ([Cloudflare][cf-about]); no cubre el requisito 3. Script de 10,3 KB gzip.                                                                                                              |
| Matomo (Cloud 29/mes, moneda no indicada) | Demasiado pesado: script de 28 KB gzip y cuota desde 29 al mes ([Matomo][matomo-pricing]); autoalojado necesita base de datos. Cookies por defecto: **no verificado**.                                                                             |
| PostHog                                   | Producto de analítica de producto, script de 128 KB gzip; su guía RGPD habla de cookies y banner con consentimiento y trata el modo sin cookies como opción aparte ([PostHog][posthog-gdpr]). Precios: **no verificado** (la página no cargó).     |
| Fathom                                    | 15 USD/mes desde 100 000 páginas vistas, **sin propiedades en eventos** (solo nombre y valor) ([precios][fathom-pricing], [eventos][fathom-events]); es posible un evento por Service, pero cuesta más que Pirsch y Plausible sin ventaja clara.   |
| Simple Analytics                          | Cumple en datos (UE, metadatos en eventos) pero 20 EUR/mes; la capa gratuita «para sitios hobby» exige una insignia y su uso comercial es **no verificado** ([precios][sa-pricing]). Queda como alternativa si importa el hosting en Países Bajos. |
| Autoalojar Plausible CE, Umami o Matomo   | Necesitan ClickHouse y Postgres (Plausible), PostgreSQL (Umami) o MySQL (Matomo, **no verificado**) más un servidor: choca con el [ADR 0001][adr-0001] y con el coste en tiempo. Ver 3.5.                                                          |

### 3.3 Candidatos que encajan (datos verificados)

Precios en USD salvo que se indique; consultados el 2026-11-28. Tamaños: archivo servido por el CDN del proveedor el 2026-11-28, comprimido con `gzip -9` (aproximado: el servidor real suele usar Brotli, que comprime algo más).

**Pirsch Cloud**

- Precio: **Standard 6 USD/mes** desde 10 000 páginas vistas (50 sitios), Plus 12 USD/mes, Enterprise a medida; prueba de 30 días sin tarjeta; código promocional del 20 % hasta el 2026-12-31 ([precios][pirsch-pricing]). Los eventos personalizados cuentan para el límite de páginas vistas.
- Eventos: `pirsch('Nombre', { meta: { clave: 'valor' } })` o atributos `data-pirsch-event` y `data-pirsch-meta-<clave>` (solo clics); hasta 20 metadatos, valores de texto ([eventos][pirsch-events]). Disponibilidad por plan: no se indica, pero la página de precios no los restringe.
- Referrers y UTM: sí; canal **AI** inferido de referrer o UTM source para una lista de dominios (por ejemplo perplexity.ai, openai.com); las peticiones directas de la IA se ignoran como no humanas ([estadísticas][pirsch-stats]).
- Almacenamiento e identificadores: sin cookies; el ID es un hash de IP, user agent, fecha y una sal por sitio; no se reconoce al visitante más de 24 horas; la IP no se persiste (según el propio proveedor) ([privacidad][pirsch-privacy]). El script lee una clave `disable_pirsch` de localStorage para desactivarse ([solución de problemas][pirsch-trouble]); no verifiqué si escribe algo.
- Hosting: clúster en **Alemania** ([precios][pirsch-pricing]). Empresa y DPA: **no verificado**.
- Exportación: CSV desde ajustes y API ([precios][pirsch-pricing]). Retención ilimitada (ver riesgo con los 25 meses de la AEPD).
- Script `pa.js`: 11,8 KB, **3,5 KB gzip**.
- Next.js: no hay paquete oficial ni guía de App Router en lo que encontré; se carga `pa.js` con `next/script` y el atributo `data-code`; la propia documentación avisa de que los atributos de eventos pueden fallar en SPAs si el script carga antes del DOM ([solución de problemas][pirsch-trouble]). Sitio estático: sí, no necesita backend.

**Plausible Cloud**

- Precio: **Starter 9, Growth 14, Business 19 USD/mes** en el tramo de 10 000 páginas vistas; 2 meses gratis en facturación anual; **30 días de prueba sin tarjeta**; no hay plan gratuito ([plausible.io][plausible-home]). La página `/pricing` devolvió 404, así que los límites exactos por plan son **no verificado**.
- Eventos: `plausible('Nombre', { props: {...} })`; las **propiedades personalizadas son una función del plan Business** (19 USD) ([propiedades][plausible-props]); en planes inferiores sirve un nombre de evento por Service, registrando cada uno como objetivo (**no verificado** el flujo exacto). Los eventos cuentan como páginas vistas facturables ([eventos][plausible-events]).
- Referrers y UTM: pestaña Fuentes y pestaña Campañas (`utm_*`, `ref`, `source`); el canal **«AI Assistants»** agrupa ChatGPT, Claude, Perplexity, Gemini, Copilot y otros ([referrers][plausible-referrers]).
- Almacenamiento: sin cookies, caché ni localStorage para identificar; ID diario = hash(sal diaria + dominio + IP + user agent) con sal rotada y borrada cada 24 h; no guarda IP ni user agent en bruto. Lee (no escribe) una marca `plausible_ignore` en localStorage ([política de datos][plausible-policy]). Retención de registros: no publicada.
- Hosting: UE, «infraestructura de empresas europeas», entidad en Estonia ([política de datos][plausible-policy]); proveedores concretos: **no verificado**.
- Exportación: CSV, API de estadísticas (plan Business), conector de Data Studio y exportación programada de datos en bruto ([API][plausible-api]).
- Script: el clásico `script.js` pesa 2,8 KB, **1,3 KB gzip**; con eventos etiquetados y enlaces salientes, 4,3 KB / 1,9 KB. El snippet actual se obtiene en el panel; no medí el snippet por sitio.
- Next.js: guía oficial con el paquete `next-plausible` (ejemplo con Pages Router) y paquete oficial `@plausible-analytics/tracker`; la guía no cubre App Router ([guía Next.js][plausible-next], [script][plausible-script]).
- Autoalojado (Community Edition): AGPLv3 según la documentación de Plausible, requiere Docker, ClickHouse y 2 GB de RAM recomendados, sin funnels ni API de sitios, solo soporte comunitario ([autoalojamiento][plausible-selfhost], [repo CE][plausible-ce]). El README del repositorio indicó otra licencia en mi lectura: **no verificado**.

**Umami Cloud (plan Hobby gratuito)**

- Precio: **Hobby 0 USD**: 100 000 eventos/mes, **1 sitio**, retención de **6 meses**, soporte comunitario. Pro 20 USD/mes (1 M de eventos, 20 sitios, 2 años). UTM y exportación disponibles en todos los planes ([precios][umami-pricing]). Cada página vista y cada propiedad de evento guardada cuenta como evento. Si el uso comercial está permitido en Hobby: **no verificado**.
- Eventos: `umami.track('nombre', {datos})` o `data-umami-event` y `data-umami-event-<clave>` (los atributos guardan texto) ([funciones][umami-tracker], [eventos][umami-events]).
- Referrers y UTM: sí. No hay canal de IA documentado; se ven los dominios de referrer.
- Almacenamiento: «el tracker no usa cookies»; ID de sesión = hash de ID del sitio, IP, user agent y sal, con **rotación mensual** por defecto; la IP no se guarda como campo ([FAQ][umami-faq], [métricas][umami-metrics], [privacidad][umami-privacy]). Si escribe algo en localStorage: **no verificado**.
- Hosting: la lista de subencargados incluye AWS (EE. UU.), Hetzner (UE), ClickHouse (EE. UU. y UE), Vercel y Cloudflare (EE. UU.) ([subencargados][umami-subs]); **la región donde se guardan los datos de Cloud no está publicada** en lo que leí: **no verificado**. Tiene DPA ([DPA][umami-privacy]).
- Script: 9,5 KB, **4,2 KB gzip**. Next.js: sin paquete oficial en la documentación leída; se carga con `next/script` y `data-website-id`. Autoalojado: PostgreSQL obligatorio ([instalación][umami-install]).

**Vercel Web Analytics y Speed Insights**

- Precio (docs actualizadas el 2026-08-25): **Hobby** 50 000 eventos/mes incluidos, ventana de 1 mes, **sin eventos personalizados**, sin UTM; al superar el límite hay 3 días de gracia y se pausa la recogida. **Pro**: 0,03 USD por 1 000 eventos, 12 meses, eventos personalizados con **2 propiedades**; **Web Analytics Plus** (+10 USD/mes por equipo): 24 meses, **8 propiedades y UTM** ([precios][vercel-pricing]). Pro cuesta 20 USD por puesto de desarrollador al mes ([plan Hobby][vercel-hobby]).
- **Plan Hobby y uso comercial:** los términos dicen «only use the Services under a Hobby plan for your personal or non-commercial use» ([términos][vercel-terms]). Un sitio de negocio de la Artist en Hobby podría incumplirlo; **no verificado** cómo lo aplica Vercel en la práctica. Esto es un riesgo independiente de la analítica.
- Eventos: `track('Nombre', { propiedad: 'valor' })` de `@vercel/analytics`; valores string, número, booleano o null, 255 caracteres como máximo ([eventos][vercel-events]).
- Referrers: panel Referrers; los UTM, solo con Plus ([filtros, citado en llm-agents.md][vercel-filtering]). Sin canal de IA documentado.
- Almacenamiento: sin cookies de terceros; hash de la petición; la sesión se descarta a las 24 h; datos por evento (URL, referrer, geolocalización, SO, navegador, dispositivo) ([privacidad][vercel-privacy]). Speed Insights es anónimo y no reconstruye sesiones ([Speed Insights][vercel-si-privacy]).
- Hosting de los datos: **no verificado**. Exportación: **Drains** a endpoint propio o S3 (solo Pro y Enterprise, 0,50 USD por GB) ([Drains][vercel-drains]); no vi exportación CSV desde el panel: **no verificado**. Los datos viven en el equipo de Vercel; la propiedad o transferencia a la Artist depende de a quién pertenezca ese equipo.
- Script: `script.js` 4,5 KB, **2,0 KB gzip** (Speed Insights, 20,3 KB, 7,3 KB gzip). Next.js: **paquete oficial** `@vercel/analytics/next` con el componente `<Analytics />` en `app/layout.tsx` ([paquete][vercel-package]); es el único con integración de primera parte, y no añade proveedor ni contrato nuevo (ya se usa Vercel como hosting).

**GoatCounter**

- Precio: gratuito «para uso público razonable»; los términos aceptan expresamente webs personales y de pequeñas y medianas empresas ([términos][goat-terms]). Operado desde Irlanda; la ubicación de los servidores: **no verificado**.
- Eventos: sin propiedades; solo `path`, `title` y `event`; el contexto se mete en el nombre (`wa-novia`) ([eventos][goat-events]). Cubre el requisito 3 con un nombre por Service.
- Campañas: `utm_campaign` o `campaign`, y fuente de `utm_source`, `ref`, `src`, `source` o el referrer ([campañas][goat-campaigns]).
- Almacenamiento: el ID de sesión es un UUID aleatorio en memoria del servidor durante 8 horas; IP y user agent no se guardan en disco ([sesiones][goat-sessions]). Sin cookies mencionadas.
- Exportación: JSON, CSV y API. Autoalojado: binario con SQLite o PostgreSQL ([repositorio][goat-repo]). Script: 9,2 KB, **3,3 KB gzip**. Sin canal de IA ni paquete oficial de Next.js; se carga con `next/script`.

### 3.4 Integración con Next.js App Router

- Todas funcionan con un sitio estático sin backend: el script envía los datos al servicio del proveedor. Solo cambia el origen del script.
- **Carga:** `next/script` en `app/layout.tsx` con `strategy="afterInteractive"` (por defecto) o `lazyOnload` (al quedar el navegador ocioso) y el script se carga una sola vez aunque se navegue ([Next.js][nextjs-scripts]). Un `<Script>` sin manejadores de eventos puede estar en un Server Component. `strategy="worker"` es experimental y no funciona con App Router.
- **Evento de clic en WhatsApp:** hoy `ButtonLink` y los enlaces de Booking son Server Components. Con las herramientas que admiten **atributos de datos** (Pirsch `data-pirsch-event`, Umami `data-umami-event`, Plausible con clases de eventos etiquetados) el evento se declara en el propio `<a>` y no hace falta convertir nada en Client Component; en Vercel hace falta llamar a `track()` desde un `onClick`, es decir, un Client Component mínimo. Que los atributos se registren bien tras una navegación del lado del cliente: **no verificado** en cada proveedor (Pirsch avisa de problemas en SPAs).
- **Propiedad con el Service o Class:** en el sitio el mensaje de WhatsApp ya está construido desde los datos de `src/data` con `buildWhatsAppLink`, por lo que el slug del Service puede pasar como atributo o propiedad sin duplicar textos. Sin propiedades (GoatCounter, Fathom, Plausible Starter) se usa un nombre de evento por Service o Class.
- **CSP, `beforeSend` y privacidad de URL:** el mensaje de WhatsApp va en la URL del enlace (`?text=`). Plausible registra la propiedad `url` del enlace etiquetado salvo que se elimine con `transformRequest` ([eventos][plausible-events]); conviene registrar solo un identificador del Service, no el texto. Vercel permite filtrar con `beforeSend` ([paquete][vercel-package]).
- **React Compiler:** sigue desactivado; ninguna de estas integraciones lo cambia.

### 3.5 Autoalojamiento frente al ADR 0001

El [ADR 0001][adr-0001] decide no tener backend ni base de datos. Autoalojar exige un servidor con base de datos: ClickHouse y 2 GB de RAM para Plausible CE, PostgreSQL para Umami, SQLite o PostgreSQL para GoatCounter ([Plausible CE][plausible-ce], [Umami][umami-install], [GoatCounter][goat-repo]). Además, el propietario asume copias de seguridad, actualizaciones y disponibilidad (en Plausible CE, «community supported only»). Con tráfico de unos pocos miles de páginas vistas al mes, el ahorro (unos 6 a 9 USD) no compensa la carga operativa. **Se descarta**; las versiones en la nube dan además exportación y traspaso de la cuenta a la Artist.

### 3.6 Medir visitas desde asistentes de IA (objetivo A3)

- Plausible (canal «AI Assistants») y Pirsch (canal «AI») agrupan las fuentes de IA ya clasificadas; en Umami, GoatCounter y Vercel se ven los dominios de referrer (chatgpt.com, perplexity.ai…) y hay que filtrarlos a mano.
- Sigue siendo cierto lo de [llm-agents.md](./llm-agents.md): no hay documentación primaria de qué asistentes envían referrer, así que hay que observarlo; y ninguna analítica de navegador ve los rastreadores. La regla de **Firewall con acción Log** de A3 sigue siendo necesaria y es independiente de la herramienta. En Hobby hay hasta 3 reglas WAF personalizadas ([plan Hobby][vercel-hobby]), por lo que conviene una sola regla con una expresión para varios user agents.

## 4. Objetivos

| ID  | Objetivo                                                                                                   | Prioridad | Esfuerzo |
| --- | ---------------------------------------------------------------------------------------------------------- | --------- | -------- |
| M1  | Decidir el riesgo legal (banner o configuración exenta) y la herramienta                                   | P1        | S        |
| M2  | Instalar el script con `next/script` solo en producción, con el identificador en una variable de entorno   | P1        | S        |
| M3  | Evento de clic en WhatsApp con el Service o Class, sin enviar el texto del mensaje                         | P1        | S        |
| M4  | Documentar la medición en el aviso de privacidad y firmar el contrato de encargado (artículo 28 RGPD)      | P1        | S        |
| M5  | Documentar la evaluación de configuración que pide la AEPD y fijar la conservación en 25 meses como máximo | P2        | S        |

### M1: Decidir el riesgo legal y la herramienta (P1, S)

- **Por qué**: es la única decisión que bloquea L1, L2 y A3.
- **Qué hacer**: elegir entre (a) analítica exenta sin banner, con las garantías de 3.1, o (b) banner de consentimiento antes de cargar cualquier script. Con (b) la herramienta importa menos (las alternativas ligeras también pueden esperar al consentimiento).
- **Verificar**: decisión anotada en el backlog; si es (a), se guarda la evaluación de M5.
- **Dependencias**: ninguna.

### M2: Instalar el script (P1, S)

- **Qué hacer**: `<Script src=… strategy="afterInteractive" />` en el layout raíz, condicionado a una variable de entorno (igual que L1: sin variable, no se carga). Variable pública solo con el identificador del sitio.
- **Verificar**: en la pestaña Red aparece una única petición del script y una de datos; no hay cookies ni entradas nuevas de localStorage (Application); `pnpm parity` no cambia el aspecto.

### M3: Evento de clic en WhatsApp (P1, S)

- **Qué hacer**: añadir al enlace de Booking los atributos de evento (o `onClick` si se elige Vercel) con el nombre `whatsapp_click` y una propiedad `service` con el slug; si la herramienta no admite propiedades, un nombre por Service.
- **Verificar**: un clic de prueba aparece en el panel con el Service correcto y sin el texto del mensaje; prueba unitaria de que el atributo sale de los datos y no de texto duplicado.
- **Dependencias**: M2.

### M4 y M5: Documentación legal (P1/P2, S)

- **Qué hacer**: en el aviso de privacidad (L2) nombrar la herramienta, la finalidad (medición de audiencia), los datos, el proveedor como encargado, el lugar de tratamiento y la conservación máxima; archivar el contrato de encargado y una nota de evaluación de configuración (sin cookies, sin reutilización, retención acotada).
- **Verificar**: la política se enlaza desde el pie; la retención configurada es ≤ 25 meses.

## 5. Riesgos y preguntas abiertas

**Legal**

- **Riesgo residual de no poner banner.** No hay pronunciamiento de la AEPD sobre estas herramientas concretas; la exención de la guía de enero de 2024 se pensó para «cookies o tecnologías similares». Si la AEPD o un tribunal leyera que el hash de IP y user agent o los UTM quedan fuera de lo «estrictamente necesario», haría falta consentimiento. No investigué la práctica sancionadora (**no verificado**).
- **Coherencia entre guías.** La guía general sigue diciendo que las cookies de análisis no están exentas; la de audiencia admite una excepción. Si el criterio cambia, hay que revisar las dos.
- **Contratos.** Solo verifiqué un DPA publicado para Umami y Fathom. Para el proveedor elegido hay que obtener y archivar el DPA antes de salir en producción.
- **Retención.** Pirsch (ilimitada) y Plausible (no publicada) pueden superar los 25 meses si no se acota o se borra a mano.

**Datos y proveedor**

- **Transferencias fuera de la UE.** Umami y Vercel usan subencargados en EE. UU.; la AEPD exige que cualquier transferencia cumpla el RGPD. Pirsch (Alemania) y Plausible (UE) las evitan según su propia información.
- **Proveedor pequeño.** Pirsch, GoatCounter y Plausible son empresas o proyectos pequeños; hay que poder exportar los datos y migrar. Tener un solo script y un solo evento hace barata la migración.
- **Plan de Vercel.** Si el sitio está en Hobby, los términos de Hobby son un riesgo aparte de este documento (ver 3.3).
- **Bloqueadores de anuncios.** Los scripts de analítica pueden ser bloqueados por parte de los visitantes y la cifra será una cota inferior. La documentación de Vercel menciona un «Resilient Intake» para reducirlo ([privacidad][vercel-privacy]); los demás: **no verificado**.
- **Medición del cierre.** El clic en WhatsApp no demuestra una reserva; es un indicador de interés.

## 6. Recomendación

**Recomendada: Pirsch Cloud, plan Standard (6 USD/mes).**

- Cumple los siete requisitos con datos verificados: páginas, referrers y UTM; canal de IA propio; eventos con metadatos (cada Service o Class como propiedad); sin cookies; datos en Alemania; CSV y API de exportación y la cuenta es de la Artist; coste de unos 5 a 6 EUR al mes tras 30 días de prueba; script de 3,5 KB gzip frente a 156 KB de GA4.
- Funciona con el sitio estático tal cual (un `<Script>` y atributos en el enlace) y no toca el ADR 0001.
- Se configura sin banner **solo si** el dueño acepta el riesgo de 3.1 y cumple las garantías (información en la política, contrato del artículo 28, retención ≤ 25 meses, evaluación documentada).
- Puntos débiles: es un proveedor pequeño; no verifiqué su DPA ni el contenido exacto de su lectura de localStorage; no hay guía oficial de App Router.

**Alternativa: Plausible Cloud.** Mejor documentada en privacidad (sal diaria, sin almacenamiento, UE, canal «AI Assistants», guía de Next.js). Cuesta 9 USD/mes en Starter, pero las propiedades de eventos requieren Business (19 USD); en Starter se necesitaría un evento por Service. Es la opción si se prioriza la reputación del proveedor sobre 3 o 10 USD al mes.

**Opción gratuita: Umami Cloud Hobby.** Propiedades, UTM y exportación incluidos y 0 USD; limitaciones: 1 sitio, 6 meses de retención y **región de datos no verificada** (subencargados en EE. UU. y UE). Aceptable si el coste es lo primero y se confirma la región con el proveedor.

**Cuándo no:** Vercel Web Analytics solo si ya hay un plan Pro y se acepta pagar el complemento Plus para UTM (unos 30 USD/mes con un puesto); en Hobby no sirve para el evento de WhatsApp.

### Tabla comparativa

Precios del 2026-11-28 en USD salvo indicación. «Props» = eventos con propiedades. Tamaños medidos por mí (gzip -9).

| Herramienta              | Precio                                        | Props                                    | Referrers y UTM; IA                        | Cookies y almacenamiento                      | Hosting de datos                     | Exportación                      | Script (gzip) | Next.js App Router                    | Encaja              |
| ------------------------ | --------------------------------------------- | ---------------------------------------- | ------------------------------------------ | --------------------------------------------- | ------------------------------------ | -------------------------------- | ------------- | ------------------------------------- | ------------------- |
| GA4 (línea base)         | Gratis                                        | Sí (no verificado en esta investigación) | Sí (no verificado)                         | Cookies; requiere consentimiento según L1     | No verificado                        | No verificado                    | 156 KB        | `next/script`                         | Línea base          |
| Pirsch Cloud             | 6 / 12 al mes; 30 días de prueba              | Sí (20 pares, texto)                     | Sí; canal AI                               | Sin cookies; hash IP+UA+fecha+sal; ID de 24 h | Alemania                             | CSV y API                        | 3,5 KB        | `next/script` + `data-code`           | **Recomendada**     |
| Plausible Cloud          | 9 / 14 / 19 al mes; 30 días de prueba         | Solo plan Business                       | Sí; canal AI Assistants                    | Sin cookies ni storage; hash diario           | UE (Estonia, infra europea)          | CSV, API (Business), Data Studio | 1,3 KB        | `next-plausible` / paquete oficial    | **Alternativa**     |
| Umami Cloud (Hobby)      | 0; Pro 20 al mes                              | Sí                                       | Sí; sin canal AI                           | Sin cookies; hash con sal mensual             | No verificado (UE y EE. UU. subenc.) | Todos los planes                 | 4,2 KB        | `next/script` + `data-website-id`     | Gratis, con dudas   |
| Vercel Web Analytics     | Hobby 0 (sin eventos); Pro desde 20 + 10 Plus | Pro: 2; Plus: 8                          | Referrers; UTM solo con Plus; sin canal AI | Sin cookies; hash; sesión de 24 h             | No verificado                        | Drains (Pro), 0,50 por GB        | 2,0 KB        | `@vercel/analytics/next` (oficial)    | Solo si ya es Pro   |
| GoatCounter              | 0 (uso razonable)                             | No (nombre de evento)                    | Sí; sin canal AI                           | Sin cookies; UUID en memoria 8 h              | No verificado                        | JSON, CSV, API                   | 3,3 KB        | `next/script`                         | Gratis, básico      |
| Simple Analytics         | 20 EUR al mes; gratis con insignia (hobby)    | Sí                                       | Sí; canal AI no verificado                 | Sin cookies ni localStorage                   | UE (Países Bajos)                    | No verificado en plan básico     | 4,8 KB        | `next/script`                         | Más caro            |
| Fathom                   | 15 al mes (100 000 páginas); 7 días           | No (nombre y valor)                      | Sí; canal AI no verificado                 | Sin cookies; hash SHA-256 con sal diaria      | Aislamiento UE (EE. UU. y BunnyWay)  | Incluida en todos los planes     | 2,1 KB        | `fathom-client` (oficial en sus docs) | Más caro, sin props |
| Cloudflare Web Analytics | Gratis                                        | No documentado                           | No documentado                             | No indicado                                   | No verificado                        | No verificado                    | 10,3 KB       | `next/script`                         | Descartada          |
| Matomo Cloud             | Desde 29 al mes (moneda no indicada)          | Sí (no verificado)                       | Sí (no verificado)                         | No verificado                                 | Fráncfort                            | No verificado                    | 28,1 KB       | `next/script`                         | Descartada          |
| PostHog                  | No verificado                                 | Sí (no verificado)                       | No verificado                              | Cookies por defecto, según su guía            | UE Fráncfort (opcional)              | No verificado                    | 128 KB        | Paquete propio                        | Descartada          |

## 7. Qué cambia en el backlog bajo esta recomendación

No he modificado `docs/backlog.md`; esto es lo que habría que editar si el dueño decide.

- **L1** («Analytics with consent… GA4 con banner y Consent Mode v2»): se sustituye por «Analítica ligera sin cookies (Pirsch Cloud) con evento de WhatsApp». Desaparecen el banner, el Consent Mode v2 y la variable `NEXT_PUBLIC_GA_ID`; aparece una variable pública con el código del sitio (no se carga si falta). **Si el dueño prefiere el criterio conservador**, L1 queda como banner de consentimiento, pero con una herramienta ligera en lugar de GA4. Prioridad P1, esfuerzo S (antes M).
- **L2** (aviso legal y política de privacidad): sigue siendo necesaria. La política de privacidad debe describir la analítica (finalidad, datos, proveedor como encargado, lugar, conservación máxima de 25 meses). Ya no hace falta política de cookies si no hay cookies ni almacenamiento, aunque conviene decirlo expresamente («tecnologías similares»). Debe hacerse **antes** de activar la analítica sin banner, porque la información en la política es una garantía exigida por la AEPD.
- **A3** («Medir visitas desde asistentes de IA…»): se simplifica; la dependencia de L1 pasa a ser solo «tener la herramienta instalada». El panel de la herramienta sustituye al panel Referrers de Vercel; la regla de Firewall con acción Log por user agent sigue igual. Anotar en [llm-agents.md](./llm-agents.md) qué referrers aparecen en la práctica (O3-e). Con Vercel, los UTM exigirían Plus.

## 8. Decisiones que quedan para el dueño

1. **¿Banner o configuración exenta?** Es una decisión de riesgo, no técnica. Sin banner hay riesgo residual por la zona gris de 3.1; con banner se pierde parte de los datos de los visitantes que lo rechazan.
2. **Herramienta:** Pirsch (recomendada), Plausible (más conocida, algo más cara) o Umami Hobby (gratis, región por confirmar). Si es Plausible, ¿Starter con un evento por Service o Business con propiedades?
3. **Presupuesto:** ¿se aceptan 6 a 9 USD al mes con tarjeta (todas las de pago piden tarjeta tras la prueba, salvo indicación contraria)?
4. **Plan de Vercel:** ¿Hobby o Pro? Afecta a Vercel Web Analytics y al riesgo de uso comercial en Hobby.
5. **¿Quién firma el contrato de encargado** (artículo 28) y archiva la evaluación? Debe ser la Artist como responsable.
6. **Asesoría legal:** ¿se consulta a un profesional antes de quitar el banner? Recomendable dado lo no resuelto.
7. **Qué se registra en el evento:** solo el slug del Service o Class (recomendado) o también el origen de la página; nunca el texto del mensaje.

## 9. Fuentes

Consultadas el 2026-11-28. Las páginas de Vercel indican su fecha de actualización en la propia página.

**Legales**

[boe-lssi]: https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758
[aepd-guia]: https://www.aepd.es/guias/guia-cookies.pdf
[aepd-audiencia]: https://www.aepd.es/guias/guia-cookies-analiticas-externas.pdf
[edpb-2-2023]: https://www.edpb.europa.eu/our-work-tools/documents/public-consultations/2023/guidelines-22023-technical-scope-art-53-eprivacy_en

(PDF de las Directrices 2/2023 v2.0: https://www.edpb.europa.eu/system/files/documents/2024-10/edpb_guidelines_202302_technical_scope_art_53_eprivacydirective_v2_en_0.pdf)

**Proyecto**

[adr-0001]: ../adr/0001-content-as-code-without-backend.md

**Vercel y Next.js**

[vercel-privacy]: https://vercel.com/docs/analytics/privacy-policy
[vercel-pricing]: https://vercel.com/docs/analytics/limits-and-pricing
[vercel-events]: https://vercel.com/docs/analytics/custom-events
[vercel-package]: https://vercel.com/docs/analytics/package
[vercel-hobby]: https://vercel.com/docs/plans/hobby
[vercel-terms]: https://vercel.com/legal/terms
[vercel-drains]: https://vercel.com/docs/drains
[vercel-si-privacy]: https://vercel.com/docs/speed-insights/privacy-policy
[vercel-filtering]: https://vercel.com/docs/analytics/filtering
[nextjs-scripts]: https://nextjs.org/docs/app/guides/scripts

**Proveedores**

[pirsch-pricing]: https://pirsch.io/pricing
[pirsch-events]: https://docs.pirsch.io/advanced/events
[pirsch-stats]: https://docs.pirsch.io/get-started/statistics
[pirsch-privacy]: https://docs.pirsch.io/privacy
[pirsch-trouble]: https://docs.pirsch.io/get-started/troubleshooting
[plausible-home]: https://plausible.io/
[plausible-policy]: https://plausible.io/data-policy
[plausible-events]: https://plausible.io/docs/custom-event-goals
[plausible-props]: https://plausible.io/docs/custom-props/introduction
[plausible-referrers]: https://plausible.io/docs/top-referrers
[plausible-api]: https://plausible.io/docs/stats-api
[plausible-script]: https://plausible.io/docs/plausible-script
[plausible-next]: https://plausible.io/docs/nextjs-integration
[plausible-selfhost]: https://plausible.io/docs/self-hosting
[plausible-ce]: https://github.com/plausible/community-edition
[umami-pricing]: https://umami.is/pricing
[umami-tracker]: https://docs.umami.is/docs/tracker-functions
[umami-events]: https://docs.umami.is/docs/track-events
[umami-faq]: https://docs.umami.is/docs/faq
[umami-metrics]: https://docs.umami.is/docs/metric-definitions
[umami-privacy]: https://umami.is/privacy
[umami-subs]: https://umami.is/subprocessors
[umami-install]: https://docs.umami.is/docs/install
[goat-terms]: https://www.goatcounter.com/terms
[goat-events]: https://www.goatcounter.com/help/events
[goat-campaigns]: https://www.goatcounter.com/help/campaigns
[goat-sessions]: https://www.goatcounter.com/help/sessions
[goat-repo]: https://github.com/arp242/goatcounter
[sa-pricing]: https://www.simpleanalytics.com/pricing
[sa-collect]: https://docs.simpleanalytics.com/what-we-collect
[fathom-pricing]: https://usefathom.com/pricing
[fathom-events]: https://usefathom.com/docs/events/overview
[fathom-dpa]: https://usefathom.com/legal/dpa
[cf-about]: https://developers.cloudflare.com/web-analytics/about/
[matomo-pricing]: https://matomo.org/pricing/
[posthog-gdpr]: https://posthog.com/docs/privacy/gdpr-compliance

**Archivos de script medidos el 2026-11-28** (descargados de su CDN; tamaño bruto y gzip -9): `https://plausible.io/js/script.js` (2 841 / 1 298 bytes), `https://plausible.io/js/script.tagged-events.outbound-links.js` (4 349 / 1 898), `https://cloud.umami.is/script.js` (9 490 / 4 235), `https://cdn.usefathom.com/script.js` (6 981 / 2 096), `https://api.pirsch.io/pa.js` (11 757 / 3 460), `https://scripts.simpleanalyticscdn.com/latest.js` (9 611 / 4 803), `https://static.cloudflareinsights.com/beacon.min.js` (31 853 / 10 270), `https://gc.zgo.at/count.js` (9 213 / 3 327), `https://cdn.matomo.cloud/matomo.js` (85 603 / 28 144), `https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX` (447 020 / 155 618; solo el cargador, con un ID de prueba), `https://us-assets.i.posthog.com/static/array.js` (395 540 / 128 264), `https://va.vercel-scripts.com/v1/script.js` (4 518 / 2 044), `https://va.vercel-scripts.com/v1/speed-insights/script.js` (20 277 / 7 311).
