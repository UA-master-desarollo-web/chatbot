# Saúl Hernández - Practica 1, chatbot

## Link del bot en telegram: [@Azzy_chat_bot](https://t.me/Azzy_chat_bot)

## Link del codigo para el api fullfillment: [Github](https://github.com/UA-master-desarollo-web/chatbot/settings)

<img src="/EjemploTelegram.jpeg" alt="drawing" width="250"/>

### Definir objetivo y tareas a desarrollar por el chatbot (descripción de la idea/proyecto/empresa).

El objetivo del bot es tratar temas de dominio general, responder consultas mediante conexion a distintas apis y esponder preguntas acerca del desarrollador del bot.

Esto lo realizara en un lenguaje coloquial y juvenil, dando un tono divertido al bot, simulando una conversación entre 2 personas reales.

El bot está realizado en inglés y tiene conexion con 3 apis distintas para ofrecer:

- chistes
- actividades
- datos curiosos

Utiliza 2 tipos de interacciones complejas

1. Contexto: al solicitar un chiste, dato o actividad, se establece un contexto para poder solicitar el siguiente (next/another) y que responda adecuadamente.

   Adicionalmente, las interacciones "who created you" y "who is saul" establecen el contexto "backgroun" para continuar la conversacion con las interacciones "developer backgrund" y "developer life".

2. Al solicitar un favorito, se requiere el parametro "favorito", que es una entidad personalizada que puede tomar los valores:

   - color
   - food
   - drink
   - animal
   - movie
   - book
   - song
   - sport
   - subject
   - season

   En caso de que no se exprese el parametro en la consulta, el bot solicita el parametro para que el usuario lo indique y posteriormente realiza una llamada a un api para consultar la respuesta correspondiente

### Intenciones:

Dominio general, común (10 intenciones). Saludos, despedida, sobre el bot

1. 👍 hi / hello / hey ...
2. 👍 good bye / bye / cya ...
3. 👍 what´s up? / how u doin ...
4. 👍 [tell me a joke](https://official-joke-api.appspot.com/)
5. 👍 [im bored](https://www.boredapi.com/)
6. 👍 happy birthday
7. 👍 whats ur favorite....? (uses parameters to search favorite item in api)
8. 👍 u like someone?
9. 👍 [random fact](https://uselessfacts.jsph.pl/random.json?language=en)
10. 👍 next (detect context joke vs bored vs facts)

Intenciones explicando para qué sirve el chatbot y en qué nos puede ayudar (10 intenciones).

1. 👍 who created you? (sets context background)
2. 👍 who is saul? (sets context background)
3. 👍 when where you made?
4. 👍 tell me about you
5. 👍 developer's background (on context: background)
6. 👍 developer's life (on context: background)
7. 👍 How were you made?
8. 👍 Where are you?
9. 👍 Whats your name?
10. 👍 What can you do?

### Debe entregar un gráfico en el que se vea claramente cuál es el flujo de la conversación, destacando los parámetros

Aqui se muestra un diagrama de la interaccion entre intenciones
![Diagrama de intents](/intents.png)

#### intent: Give me an activity

Aqui un ejemplo del contexto para las intenciones con follow up. La intencion inicial establece el contexto
![Contexto de intencion follow up](/Followup_context.png)
Y la intencion follow, lo recibe como entrada, y lo vuelve a establecer como salida para mantenerlo vivo
![Contexto de intencion follow up - seguimiento](/Followup_context_2.png)

#### intent: Whats your favorite

La intencion "whats your favorite" requiere el parametro "favorite"
![Parametros de favoritos](/favorite_parameters.png)

### Despliegue del chatbot en su versión web-demo, o en alguna plataforma de mensajería.

El bot se encuentra desplegado en telegram con el usuario [@Azzy_chat_bot](https://t.me/Azzy_chat_bot)

### Realizar intenciones que impliquen la consulta de servicios, APIs externas mediante webhook. En tal caso, se debe incluir en la entrega la descripción del Fullfilment y conexión con la API, además del código desarrollado.

DialogFlow solo puede realizar llamadas a un api endpoint, por lo que se creó un api personalizado para fullfillment que recibe las consultas del bot, y las procesa para orquestar las consultas a las apis externas.

Las apis utilizadas son las siguientes:

1. 👍 https://official-joke-api.appspot.com/
2. 👍 https://www.boredapi.com/
3. 👍 https://uselessfacts.jsph.pl/random.json?language=en

Además, esta misma api es la encargada de responder a la interacción "tell me your favorite", y de acuerdo al parametro establecido, responde con la informacion correspondiente

Aqui se muestra la activacion del fullfillment en DialogFlow.
Como se puede apreciar, es un api publicada en render.com, y el codigo desarollado se puede encontrar en [Github](https://github.com/UA-master-desarollo-web/chatbot/settings)
![Fullfillment](/fullfillment.png)
