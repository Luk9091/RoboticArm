#include "ssi.h"

Servo_t *ssi_arm = NULL;
Servo_t *ssi_base = NULL;
Servo_t *ssi_hand = NULL;
Servo_t *ssi_rotor = NULL;
uint OC = 0;

const char *ssi_tags[] = {
    "Arm",
    "Base",
    "Hand",
    "Rotor",
    "OC"
};

void ssi_block_message(uint value){
    OC = OC | value;
}

void ssi_release_message(uint value){
    OC = OC & ~value;
}

tSSIHandler ssi_handler(int index, char *insert, size_t len){
    tSSIHandler printed;
    int data = -1;

    switch(index){
        case 0: {
            data = 180 - ssi_arm->angle;
        }break;
        case 1: {
            data = 180 - ssi_base->angle;
        }break;
        case 2: {
            data = ssi_hand->angle;
        }break;
        case 3: {
            data = ssi_rotor->angle;
        }break;
        case 4: {
            data = OC;
        } break;
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
    ssi_arm   = arm;
    ssi_base  = base;
    ssi_hand  = hand;
    ssi_rotor = rotor;


    http_set_ssi_handler(ssi_handler, ssi_tags, LWIP_ARRAYSIZE(ssi_tags));
}