#ifndef _DATA_H_
#define _DATA_H_

namespace data {
    struct ParkData {
        int id;
        int status;
        int time;

        static String serialize(ParkData data) {
            return String(data.id) + "," + String(data.status) + "," + String(data.time);
        }

        static ParkData deserialize(String data) {
            ParkData parkData;
            int index = 0;
            int lastIndex = 0;
            while(index != -1) {
                index = data.indexOf(',', lastIndex);
                if(index == -1) {
                    parkData.time = data.substring(lastIndex).toInt();
                    break;
                }

                String value = data.substring(lastIndex, index);
                switch(index) {
                    case 0:
                        parkData.id = value.toInt();
                        break;
                    case 1:
                        parkData.status = value.toInt();
                        break;
                }

                lastIndex = index + 1;
            }

            return parkData;
        }
    }

    struct HubData {
        
    };
}

#endif