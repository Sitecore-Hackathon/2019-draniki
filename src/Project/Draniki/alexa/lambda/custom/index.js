// Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Licensed under the Amazon Software License
// http://aws.amazon.com/asl/

/* eslint-disable  func-names */
/* eslint-disable  no-console */
/* eslint-disable  no-restricted-syntax */

const Alexa = require('ask-sdk');
const ddbAdapter = require('ask-sdk-dynamodb-persistence-adapter'); // included in ask-sdk

// TODO: The items below this comment need your attention.
const SKILL_NAME = 'Draniki';
const ddbTableName = 'draniki-alexa-commands';

const FALLBACK_MESSAGE = `The ${SKILL_NAME} skill can't help you with that.`;
const FALLBACK_REPROMPT = 'Please guess a number between 0 and 100.';
const FALLBACK_MESSAGE_OUTSIDE = `The ${SKILL_NAME} skill can't help you with that. `;
const FALLBACK_REPROMPT_OUTSIDE = 'Say yes to start the game or no to quit.';

const utils = {
  createCommand: (type, parameters) => {
    const timestamp = new Date().toISOString();

    return {
      type,
      parameters,
      timestamp,
    };
  },
};

const LaunchRequest = {
  canHandle(handlerInput) {
    // launch requests as well as any new session, as games are not saved in progress, which makes
    // no one shots a reasonable idea except for help, and the welcome message provides some help.
    return handlerInput.requestEnvelope.session.new || handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  async handle(handlerInput) {
    const attributesManager = handlerInput.attributesManager;
    const responseBuilder = handlerInput.responseBuilder;

    const attributes = (await attributesManager.getPersistentAttributes()) || {};
    if (Object.keys(attributes).length === 0) {
      // TODO: replace with alexa-link
      attributes.userId = 1;
      attributes.commands = [];
      attributes.gameState = 'ENDED';
    }

    attributesManager.setSessionAttributes(attributes);
    await attributesManager.savePersistentAttributes();

    const speechOutput = `Welcome to draniki. Would you like to manage your site?`;
    const reprompt = 'Say yes to managing your site or no to quit.';
    return responseBuilder
      .speak(speechOutput)
      .reprompt(reprompt)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;

    return (
      request.type === 'IntentRequest' &&
      (request.intent.name === 'AMAZON.CancelIntent' || request.intent.name === 'AMAZON.StopIntent')
    );
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder.speak('Thanks! See you!').getResponse();
  },
};

const SessionEndedRequest = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);
    return handlerInput.responseBuilder.getResponse();
  },
};

const HelpIntent = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;

    return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechOutput = 'I am can manage draniki website';
    const reprompt = 'Try saying a command.';

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(reprompt)
      .getResponse();
  },
};

const YesIntent = {
  canHandle(handlerInput) {
    // only start a new game if yes is said when not playing a game.
    let isCurrentlyPlaying = false;
    const request = handlerInput.requestEnvelope.request;
    const attributesManager = handlerInput.attributesManager;
    const sessionAttributes = attributesManager.getSessionAttributes();

    if (sessionAttributes.gameState && sessionAttributes.gameState === 'STARTED') {
      isCurrentlyPlaying = true;
    }

    return !isCurrentlyPlaying && request.type === 'IntentRequest' && request.intent.name === 'AMAZON.YesIntent';
  },
  handle(handlerInput) {
    const attributesManager = handlerInput.attributesManager;
    const responseBuilder = handlerInput.responseBuilder;
    const sessionAttributes = attributesManager.getSessionAttributes();

    sessionAttributes.gameState = 'STARTED';

    return responseBuilder
      .speak('Great! Try saying a command')
      .reprompt('Try saying a command')
      .getResponse();
  },
};

const NoIntent = {
  canHandle(handlerInput) {
    // only treat no as an exit when outside a game
    let isCurrentlyPlaying = false;
    const request = handlerInput.requestEnvelope.request;
    const attributesManager = handlerInput.attributesManager;
    const sessionAttributes = attributesManager.getSessionAttributes();

    if (sessionAttributes.gameState && sessionAttributes.gameState === 'STARTED') {
      isCurrentlyPlaying = true;
    }

    return !isCurrentlyPlaying && request.type === 'IntentRequest' && request.intent.name === 'AMAZON.NoIntent';
  },
  async handle(handlerInput) {
    const attributesManager = handlerInput.attributesManager;
    const responseBuilder = handlerInput.responseBuilder;
    const sessionAttributes = attributesManager.getSessionAttributes();

    sessionAttributes.endedSessionCount += 1;
    sessionAttributes.gameState = 'ENDED';
    attributesManager.setPersistentAttributes(sessionAttributes);

    await attributesManager.savePersistentAttributes();

    return responseBuilder.speak('Ok, see you next time!').getResponse();
  },
};

const UnhandledIntent = {
  canHandle() {
    return true;
  },
  handle(handlerInput) {
    const outputSpeech = 'Say yes to continue, or no to quite';
    return handlerInput.responseBuilder
      .speak(outputSpeech)
      .reprompt(outputSpeech)
      .getResponse();
  },
};

const ChangeThemeIntent = {
  canHandle(handlerInput) {
    // handle numbers only during a game
    let isCurrentlyPlaying = false;
    const request = handlerInput.requestEnvelope.request;
    const attributesManager = handlerInput.attributesManager;
    const sessionAttributes = attributesManager.getSessionAttributes();

    if (sessionAttributes.gameState && sessionAttributes.gameState === 'STARTED') {
      isCurrentlyPlaying = true;
    }

    return isCurrentlyPlaying && request.type === 'IntentRequest' && request.intent.name === 'ChangeThemeIntent';
  },
  async handle(handlerInput) {
    const { requestEnvelope, attributesManager, responseBuilder } = handlerInput;

    const slots = requestEnvelope.request.intent.slots;
    // (requestEnvelope.request.intent.slots.number
    const themeName = slots['themeName'] ? slots['themeName'].value : '';
    const sessionAttributes = attributesManager.getSessionAttributes();

    if (themeName) {
      sessionAttributes.commands.push(
        utils.createCommand('change_theme', [
          {
            name: themeName,
          },
        ])
      );

      attributesManager.setPersistentAttributes(sessionAttributes);
      await attributesManager.savePersistentAttributes();

      return responseBuilder.speak(`${themeName} theme is set`).getResponse();
    }

    return handlerInput.responseBuilder
      .speak(`You said, ${themeName}. Sorry, I didn't get that.`)
      .reprompt('Try saying a theme name')
      .getResponse();
  },
};

const SubscribeIntent = {
  canHandle(handlerInput) {
    // handle numbers only during a game
    let isCurrentlyPlaying = false;
    const request = handlerInput.requestEnvelope.request;
    const attributesManager = handlerInput.attributesManager;
    const sessionAttributes = attributesManager.getSessionAttributes();

    if (sessionAttributes.gameState && sessionAttributes.gameState === 'STARTED') {
      isCurrentlyPlaying = true;
    }

    return isCurrentlyPlaying && request.type === 'IntentRequest' && request.intent.name === 'SubscribeIntent';
  },
  async handle(handlerInput) {
    const { requestEnvelope, attributesManager, responseBuilder } = handlerInput;

    const slots = requestEnvelope.request.intent.slots;
    // (requestEnvelope.request.intent.slots.number
    const email = slots['email'] ? slots['email'].value : '';
    const sessionAttributes = attributesManager.getSessionAttributes();

    // some dummy email validation :)
    if (!!sessionAttributes.subscribed && sessionAttributes.subscribed === email) {
      return handlerInput.responseBuilder
        .speak(`You are trying to use ${email} email. Sorry, it is already in use.`)
        .reprompt('Try to use another email')
        .getResponse();
    }

    if (email) {
      sessionAttributes.commands.push(
        utils.createCommand('add_news_subscription', [
          {
            email,
          },
        ])
      );

      sessionAttributes.subscribed = email;

      attributesManager.setPersistentAttributes(sessionAttributes);
      await attributesManager.savePersistentAttributes();

      return responseBuilder.speak(`${email} theme is set`).getResponse();
    }

    return handlerInput.responseBuilder
      .speak(`Sorry, I didn't get that.`)
      .reprompt('Try saying a email name')
      .getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak("Sorry, I can't understand the command. Please say again.")
      .reprompt("Sorry, I can't understand the command. Please say again.")
      .getResponse();
  },
};

const FallbackHandler = {
  canHandle(handlerInput) {
    // handle fallback intent, yes and no when playing a game
    // for yes and no, will only get here if and not caught by the normal intent handler
    const request = handlerInput.requestEnvelope.request;
    return (
      request.type === 'IntentRequest' &&
      (request.intent.name === 'AMAZON.FallbackIntent' ||
        request.intent.name === 'AMAZON.YesIntent' ||
        request.intent.name === 'AMAZON.NoIntent')
    );
  },
  handle(handlerInput) {
    const attributesManager = handlerInput.attributesManager;
    const sessionAttributes = attributesManager.getSessionAttributes();

    if (sessionAttributes.gameState && sessionAttributes.gameState === 'STARTED') {
      // currently playing
      return handlerInput.responseBuilder
        .speak(FALLBACK_MESSAGE)
        .reprompt(FALLBACK_REPROMPT)
        .getResponse();
    }

    // not playing
    return handlerInput.responseBuilder
      .speak(FALLBACK_MESSAGE_OUTSIDE)
      .reprompt(FALLBACK_REPROMPT_OUTSIDE)
      .getResponse();
  },
};

function getPersistenceAdapter(tableName) {
  // Determines persistence adapter to be used based on environment
  // Note: tableName is only used for DynamoDB Persistence Adapter
  if (process.env.S3_PERSISTENCE_BUCKET) {
    // in Alexa Hosted Environment
    // eslint-disable-next-line global-require
    const s3Adapter = require('ask-sdk-s3-persistence-adapter');
    return new s3Adapter.S3PersistenceAdapter({
      bucketName: process.env.S3_PERSISTENCE_BUCKET,
    });
  }

  // Not in Alexa Hosted Environment
  return new ddbAdapter.DynamoDbPersistenceAdapter({
    tableName: tableName,
    createTable: true,
  });
}

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .withPersistenceAdapter(getPersistenceAdapter(ddbTableName))
  .addRequestHandlers(
    LaunchRequest,
    ExitHandler,
    SessionEndedRequest,
    HelpIntent,
    YesIntent,
    SubscribeIntent,
    NoIntent,
    ChangeThemeIntent,
    FallbackHandler,
    UnhandledIntent
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
