#include <cgi.h>

Servo_t *cgi_arm = NULL;
Servo_t *cgi_base = NULL;
Servo_t *cgi_hand = NULL;
Servo_t *cgi_rotor = NULL;

const char *cgi_handler(int index, int numParams, char *param[], char *value[]){
    cgi_arm->angle   = 180 - atoi(param[0]);
    cgi_base->angle  = 180 - atoi(param[1]);
    cgi_rotor->angle = atoi(param[2]);
    cgi_hand->angle  = atoi(param[3]);

    return "/index.shtml";
}

static const tCGI cgi_handlers[] = {
    {"/cgi", cgi_handler}
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
    http_set_cgi_handlers(cgi_handlers, 1);
}