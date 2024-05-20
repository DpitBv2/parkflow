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
  if (data != "" && data != "wifiError" && data != "linkError")
  {
    int response = client->getData(data);
    if (response == 1)
    {
      servo->write(70);
      inverseSensvo->write(70);

      rgb->light(255, 0, 0);
    }
    else if (response == 0)
    {
      servo->write(0);
      inverseSensvo->write(0);

      rgb->light(0, 255, 0);
    }
  }
  else if (data == "wifiError")
  {
    servo->write(70);
    inverseSensvo->write(70);

    rgb->light(255, 255, 0);
  }
  else if (data == "linkError")
  {
    servo->write(70);
    inverseSensvo->write(70);

    rgb->light(0, 255, 255);
  }

  delay(1000);
}