#include "hardware.h"
#include <Arduino.h>

Hardware::RGB *rgb;

Hardware::ServoControl *servo;
Hardware::ServoControl *inverseSensvo;

Hardware::UltrasonicSensor *ultrasonicSensor;
Hardware::UltrasonicSensor *ultrasonicSensor2;

Hardware::LoRaTransceiver *loRa;

const int CLOSE_DISTANCE = 20;

void setup()
{
  Serial.begin(115200);

  Serial.println("Initialzing");

  rgb = new Hardware::RGB(32, 33, 27);

  rgb->light(0, 0, 255);

  servo = new Hardware::ServoControl(25);
  inverseSensvo = new Hardware::ServoControl(26);

  // ultrasonicSensor = new Hardware::UltrasonicSensor(7, 8);
  // ultrasonicSensor2 = new Hardware::UltrasonicSensor(5, 4);

  loRa = new Hardware::LoRaTransceiver;

  rgb->light(255, 0, 0);

  Serial.println("Working");
}

// double getAverage()
// {
//   return (ultrasonicSensor->read() + ultrasonicSensor2->read()) / 2;
// }

void loop()
{
  String data = loRa->recieveData();
  if (data != "")
  {
    Serial.println(data);

    if (data == "CLOSE")
    {
      // if (getAverage() < CLOSE_DISTANCE)
      // {
      //   loRa->sendData("REJECT");

      //   servo->write(180);
      //   inverseSensvo->write(180);

      //   rgb->light(255, 0, 0);
      // }
      // else
      // {
      loRa->sendData("ACCEPT");

      servo->write(180);
      inverseSensvo->write(180);

      rgb->light(255, 0, 0);
      // }
    }
    else if (data == "OPEN")
    {
      loRa->sendData("ACCEPT");

      servo->write(90);
      inverseSensvo->write(90);

      rgb->light(0, 255, 0);
    }
    else if (data == "PING")
    {
      loRa->sendData("PONG");
    }
  }
}