#include "hardware.h"
#include <Arduino.h>
// #include <memory>

Hardware::RGB *rgb;
Hardware::ServoControl *servo;

void setup()
{
  Serial.begin(115200);

  rgb = new Hardware::RGB(A1, A2, A3);
  servo = new Hardware::ServoControl(6);

  rgb->light(255, 0, 0);

  delay(2000);

  rgb->light(0, 0, 255);
}

void loop()
{
}