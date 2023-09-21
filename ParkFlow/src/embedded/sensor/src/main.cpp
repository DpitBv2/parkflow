#include "hardware.h"
#include <Arduino.h>
// #include <memory>

Hardware::RGB *rgb;

Hardware::ServoControl *servo;
Hardware::ServoControl *inverseSensvo;

Hardware::UltrasonicSensor *ultrasonicSensor;
Hardware::UltrasonicSensor *ultrasonicSensor2;

Hardware::LoRaTransceiver *loRa;

const int CLOSE_DISTANCE = 20;

void setup()
{
  Serial.begin(9600);

  Serial.println("Initialzing");

  rgb = new Hardware::RGB(A2, A1, A3);

  rgb->light(255, 255, 0);

  servo = new Hardware::ServoControl(6, true);
  inverseSensvo = new Hardware::ServoControl(3);

  ultrasonicSensor = new Hardware::UltrasonicSensor(7, 8);
  ultrasonicSensor2 = new Hardware::UltrasonicSensor(5, 4);

  loRa = new Hardware::LoRaTransceiver;

  rgb->light(255, 0, 0);

  Serial.println("Working");
}

double getAverage()
{
  return (ultrasonicSensor->read() + ultrasonicSensor2->read()) / 2;
}

void loop()
{
  // String data = loRa->recieveData();
  // if (data != "")
  // {
  //   Serial.println(data);

  //   if (data == "CLOSE")
  //   {
  //     if (getAverage() < CLOSE_DISTANCE)
  //       loRa->sendData("REJECT");
  //     else
  //     {
  //       loRa->sendData("ACCEPT");

  //       servo->write(90);
  //       inverseSensvo->write(90);

  //       rgb->light(255, 0, 0);
  //     }
  //   }
  //   else if (data == "OPEN")
  //   {
  //     loRa->sendData("ACCEPT");

  //     servo->write(0);
  //     inverseSensvo->write(0);

  //     rgb->light(0, 255, 0);
  //   }
  // }
  servo->write(0);
  inverseSensvo->write(0);

  delay(10000);

  servo->write(120);
  inverseSensvo->write(120);

  delay(10000);

  // delay(1000);
}