#include "hardware.h"
#include "client.h"
#include "data.h"

std::unique_ptr<Hardware::RGB> rgb;
std::unique_ptr<Hardware::Screen> screen;
std::unique_ptr<Hardware::GSM> gsm;
std::unique_ptr<Hardware::LoRaTransceiver> lora;

std::unique_ptr<IOT::Client> client;

bool isOpen = false;

void setup()
{
    Serial.begin(115200);

    rgb = std::unique_ptr<Hardware::RGB>(new Hardware::RGB(27, 26, 25));
    screen = std::unique_ptr<Hardware::Screen>(new Hardware::Screen());

    rgb->light(255, 0, 0);

    lora = std::unique_ptr<Hardware::LoRaTransceiver>(new Hardware::LoRaTransceiver());
    gsm = std::unique_ptr<Hardware::GSM>(new Hardware::GSM());
    client = std::unique_ptr<IOT::Client>(new IOT::Client());

    delay(2000);

    rgb->light(0, 0, 255);
    screen->clear();

    while (data::sensors.length() == 0)
    {
        pingChannels();
        screen->clear();
        screen->moveCursor(0, 10);
        screen->writeText("ParkFlow - HUB");
        screen->moveCursor(0, 25);
        screen->writeText("Searching for");
        screen->moveCursor(0, 40);
        screen->writeText("devices");
        delay(500);
    }

    screen->clear();
    screen->moveCursor(0, 20);
    screen->writeText("ParkFlow - HUB");
    screen->moveCursor(0, 35);
    screen->writeText("Connections:" + String(data::sensors.length()));
    delay(500);
}

void loop()
{
    String data = client->getRequest();

    delay(5000);
}