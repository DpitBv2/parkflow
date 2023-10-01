#ifndef _HARDWARE_H_
#define _HARDWARE_H_

#include <HardwareSerial.h>
#include <memory>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include "const.h"
#include <LoRa.h>
#include <SPI.h>

namespace Hardware
{
    namespace Config
    {
        constexpr int ScreenWidth = 128;
        constexpr int ScreenHeight = 64;
    }

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

    class Screen
    {
        std::unique_ptr<Adafruit_SSD1306> screen;

    public:
        Screen()
        {
            screen = std::unique_ptr<Adafruit_SSD1306>(new Adafruit_SSD1306(Config::ScreenWidth, Config::ScreenHeight, &Wire, -1));

            if (!screen->begin(SSD1306_SWITCHCAPVCC, 0x3C))
                Serial.println(F("SSD1306 allocation failed"));

            screen->setTextColor(WHITE);
            screen->setCursor(0, 0);
            screen->clearDisplay();

            showLogo();
        }

        void moveCursor(int x, int y)
        {
            screen->setCursor(x, y);
            screen->display();
        }

        void writeText(String text)
        {
            screen->println(text);
            screen->display();
        }

        void showLogo()
        {
            screen->clearDisplay();
            screen->drawBitmap(0, 0, ParkFlowLogo, 128, 64, WHITE);
            screen->display();
        }

        void clear()
        {
            screen->clearDisplay();
            screen->display();
        }
    };

    class GSM
    {
    private:
        HardwareSerial uartSerial;

        void init(String cmd, char *res, int t)
        {
            while (1)
            {
                Serial.println(cmd);
                uartSerial.println(cmd);

                delay(100);

                while (uartSerial.available() > 0)
                {
                    if (uartSerial.find(res))
                    {
                        Serial.println(res);

                        delay(t);
                        return;
                    }
                    else
                        Serial.println("Error");

                    delay(t);
                }
            }
        }

    public:
        GSM() : uartSerial(2)
        {
            uartSerial.begin(115200, SERIAL_8N1, 16, 17);

            init("AT", "OK", 1000);
        }

        void call(char *number)
        {
            Serial.println("Calling...");
            uartSerial.println("ATD" + String(number) + ";");
            delay(10000);
            uartSerial.println("ATH");
        }
    };

    class LoRaTransceiver
    {
    public:
        LoRaTransceiver()
        {
            LoRa.setPins(5, 14, 2);
            if (!LoRa.begin(433E6))
            {
                Serial.println("Starting LoRa failed!");
                ESP.restart();
            }
            LoRa.setSyncWord(0xF1);
        }

        void sendData(String data)
        {
            LoRa.beginPacket();
            LoRa.print(data);
            LoRa.endPacket();

            Serial.print("sendData: ");
            Serial.println(data);
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