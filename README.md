# Sparky - Alexa Skill
My little boy often asks "is today a school day". Now he can ask Alexa.

# Usage
Since this is a custom skill you need to mention the intent (skill name) so it sounds a little clumsy. By calling the skill "Sparky" it sounds a little more natural.

- Alexa, ask Sparky is it a school day
- Alexa, ask Sparky is it a school day tomorrow
- Alexa, ask Sparky is Friday a school day

# Installation
Note that I didn't publish this on the skills marketplace. I only have this on my device via my amazon developer account.

First we create the lambda function

- In AWS create a lambda function, call it Sparky
- Use the code in [SparkyLambda.js](SparkyLambda.js) with a node.js 6.x runtime
- Add an Alexa Skills Kit trigger
- Copy the ARN at the top-right of the configuration page

Now we setup the Alexa Skill

- In developer.amazon.com under the Alexa tab click Alexa Skills Kit, create new custom model
- Language = "English UK", name = "Sparky", invocation name = "sparky" (no for audio/video/render)
- Use the code in [intent-schema.json](intent-schema.json) for the intent schema field
- Sample utterances are:
  - SparkyIntent is it a school day
  - SparkyIntent is it a school day {Date}
  - SparkyIntent is {Date} a school day
- Under configuration use Lambda with the above ARN

Now verify the skills is enabled

- In alexa.amazon.co.uk click Skills then "Your Skills" at the top-right to verify Sparky is enabled

