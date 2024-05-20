#ifndef _HARDWARE_H_
#define _HARDWARE_H_

#include <HardwareSerial.h>
#include <ESP32Servo.h>
#include <Arduino.h>
#include <SPI.h>
#include <LoRa.h>

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
        bool reverse = false;

    public:
        ServoControl(int pin)
        {
            servo.attach(pin);
            write(70);
        }

        ServoControl(int pin, bool reverse)
        {
            servo.attach(pin);
            this->reverse = reverse;
            write(70);
        }

        int calculate(int angle)
        {
            if (reverse)
                return 180 - angle;
            return angle;
        }

        void write(int angle)
        {
            servo.write(calculate(angle));
        }
    };

    class UltrasonicSensor
    {
    private:
        int trigPin, echoPin;

    public:
        UltrasonicSensor(int trigPin, int echoPin)
        {
            this->trigPin = trigPin;
            this->echoPin = echoPin;

            pinMode(trigPin, OUTPUT);
            pinMode(echoPin, INPUT);
        }

        double read()
        {
            digitalWrite(trigPin, LOW);
            delayMicroseconds(2);

            digitalWrite(trigPin, HIGH);
            delayMicroseconds(10);

            digitalWrite(trigPin, LOW);

            double duration = pulseIn(echoPin, HIGH);
            return duration * 0.034 / 2;
        }
    };

    class LoRaTransceiver
    {
    public:
        LoRaTransceiver()
        {
            LoRa.setPins(5, 14, 2);
            while (!LoRa.begin(433E6))
            {
                Serial.println("Starting LoRa failed!");
            }
            LoRa.setSyncWord(0xF1);
        }

        void sendData(String data)
        {
            LoRa.beginPacket();
            LoRa.print(data);
            LoRa.endPacket();
        }

        String recieveData()
        {
            int packetSize = LoRa.parsePacket();
            if (packetSize)
            {
                String data = "";
                while (LoRa.available())
                    data += (char)LoRa.read();
                LoRa.packetRssi();
                return data;
            }
            return "";
        }
    };
}

#endif