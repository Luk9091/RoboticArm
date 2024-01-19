
#ifndef __WEB_SERVER__SSI__H
#define __WEB_SERVER__SSI__H

#include <pico/cyw43_arch.h>
#include <lwip/apps/httpd.h>
#include "servo.h"


// uint16_t ssi_handler(int iIndex, char *pcInsert, int iInsertLen);
void ssi_init(
    Servo_t *arm,
    Servo_t *base,
    Servo_t *hand,
    Servo_t *rotor
);

void ssi_block_message(uint value);
void ssi_release_message(uint value);

#endif