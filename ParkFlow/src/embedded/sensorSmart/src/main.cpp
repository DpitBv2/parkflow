#include "hardware.h"
#include "client.h"
#include <Arduino.h>

Hardware::RGB *rgb;

Hardware::ServoControl *servo;
Hardware::ServoControl *inverseSensvo;

std::unique_ptr<IOT::Client> client;

void setup()
{
  Serial.begin(115200);

  Serial.println("Initialzing");

  rgb = new Hardware::RGB(32, 33, 27);

  rgb->light(0, 0, 255);

  servo = new Hardware::ServoControl(25);
  inverseSensvo = new Hardware::ServoControl(26);

  client = std::unique_ptr<IOT::Client>(new IOT::Client());

  rgb->light(255, 0, 0);

  delay(2000);

  Serial.println("Working");
}

void loop()
{
  String data = client->getRequest();
  if (data != "")
  {
    int response = client->getData(data);
    if (response == 1)
    {
      servo->write(180);
      inverseSensvo->write(180);

      rgb->light(255, 0, 0);
    }
    else if (response == 0)
    {
      servo->write(90);
      inverseSensvo->write(90);

      rgb->light(0, 255, 0);
    }
  }

  delay(5000);
}