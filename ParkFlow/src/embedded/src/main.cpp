#include "hardware.h"

std::unique_ptr<Hardware::RGB> rgb;
std::unique_ptr<Hardware::Screen> screen;
std::unique_ptr<Hardware::GSM> gsm;

void setup() {
    Serial.begin(115200);
    
    rgb = std::unique_ptr<Hardware::RGB>(new Hardware::RGB(27, 26, 25));
    screen = std::unique_ptr<Hardware::Screen>(new Hardware::Screen());

    rgb->light(255, 0, 0);

    gsm = std::unique_ptr<Hardware::GSM>(new Hardware::GSM());

    delay(2000);

    rgb->light(0, 0, 255);
    screen->clear();
}

void loop() {
    screen->clear();

    screen->moveCursor(0, 5);
    screen->writeText("ParkFlow - HUB");
    screen->moveCursor(0, 20);
    screen->writeText("Connections: 0");
    screen->moveCursor(0, 35);
    screen->writeText("Searching for");
    screen->moveCursor(0, 45);
    screen->writeText("devices");
    delay(500);

    screen->moveCursor(0, 5);
    screen->writeText("ParkFlow - HUB");
    screen->moveCursor(0, 20);
    screen->writeText("Connections: 0");
    screen->moveCursor(0, 35);
    screen->writeText("Searching for");
    screen->moveCursor(0, 45);
    screen->writeText("devices.");
    delay(500);

    screen->moveCursor(0, 5);
    screen->writeText("ParkFlow - HUB");
    screen->moveCursor(0, 20);
    screen->writeText("Connections: 0");
    screen->moveCursor(0, 35);
    screen->writeText("Searching for");
    screen->moveCursor(0, 45);
    screen->writeText("devices..");
    delay(500);

    screen->moveCursor(0, 5);
    screen->writeText("ParkFlow - HUB");
    screen->moveCursor(0, 20);
    screen->writeText("Connections: 0");
    screen->moveCursor(0, 35);
    screen->writeText("Searching for");
    screen->moveCursor(0, 45);
    screen->writeText("devices...");
    delay(500);
}