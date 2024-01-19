#include <cgi.h>

Servo_t *cgi_arm = NULL;
Servo_t *cgi_base = NULL;
Servo_t *cgi_hand = NULL;
Servo_t *cgi_rotor = NULL;

const char *cgi_angle(int index, int numParams, char *param[], char *value[]){
    if (cgi_arm->start) cgi_arm->angle   = 180 - atoi(param[0]);
    if (cgi_base->start) cgi_base->angle  = 180 - atoi(param[1]);
    if (cgi_rotor->start) cgi_rotor->angle = atoi(param[2]);
    if (cgi_hand->start) cgi_hand->angle  = atoi(param[3]);

    return "/index.shtml";
}

const char *cgi_reset(int index, int numParams, char *param[], char *value[]){
    int data = atoi(param[0]);
    if(data & OC_ARM_NUM) Servo_start(cgi_arm);
    if(data & OC_BASE_NUM) Servo_start(cgi_base);
    if(data & OC_ROTOR_NUM) Servo_start(cgi_rotor);
    ssi_release_message(data);


    return "/index.shtml";
}

static const tCGI cgi_handlers[] = {
    {"/cgi", cgi_angle},
    {"/res", cgi_reset}
};

void cgi_init(
    Servo_t *arm,
    Servo_t *base,
    Servo_t *hand,
    Servo_t *rotor
){
    cgi_arm   = arm;
    cgi_base  = base;
    cgi_hand  = hand;
    cgi_rotor = rotor;

    http_set_cgi_handlers(cgi_handlers, 2);
}