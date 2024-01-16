#include "ssi.h"

Servo_t *_arm = NULL;
Servo_t *_base = NULL;
Servo_t *_hand = NULL;
Servo_t *_rotor = NULL;

const char *ssi_tags[] = {
    "Arm",
    "Base",
    "Hand",
    "Rotor"
};


tSSIHandler ssi_handler(int index, char *insert, size_t len){
    tSSIHandler printed;
    int data = -1;

    switch(index){
        case 0: {
            data = _arm->angle;
        }break;
        case 1: {
            data = _base->angle;
        }break;
        case 2: {
            data = _hand->angle;
        }break;
        case 3: {
            data = _rotor->angle;
        }break;
    }
    printed = (tSSIHandler)snprintf(insert, len, "%i", data);

    return printed;
}

void ssi_init(
    Servo_t *arm,
    Servo_t *base,
    Servo_t *hand,
    Servo_t *rotor
){
    _arm = arm;
    _base = base;
    _hand = hand;
    _rotor = rotor;


    http_set_ssi_handler(ssi_handler, ssi_tags, LWIP_ARRAYSIZE(ssi_tags));
}