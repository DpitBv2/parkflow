#ifndef _HARDWARE_H_
#define _HARDWARE_H_

#include <HardwareSerial.h>
#include <Servo.h>
#include <Arduino.h>

namespace Hardware
{
    class RGB
    {
    private:
        int redPin, greenPin, bluePin;

    public:
        RGB(int redPin, int greenPin, int bluePin)
        {
            this->redPin = redPin;
            this->greenPin = greenPin;
            this->bluePin = bluePin;

            pinMode(redPin, OUTPUT);
            pinMode(greenPin, OUTPUT);
            pinMode(bluePin, OUTPUT);
        }

        void light(int red, int green, int blue)
        {
            analogWrite(this->redPin, red);
            analogWrite(this->greenPin, green);
            analogWrite(this->bluePin, blue);
        }
    };

    class ServoControl
    {
    private:
        Servo servo;

    public:
        ServoControl(int pin)
        {
            servo.attach(pin);
            servo.write(0);
        }

        void write(int angle)
        {
            servo.write(angle);
        }
    };

    class LoRa
    {
    };
}

#endif