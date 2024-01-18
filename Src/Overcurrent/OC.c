#include "OC.h"

struct OC_Servo {
    Servo_t *servo;
    uint num;
};


void OC_init(){
    static bool is_init = false;
    if (is_init){
        printf("Over current protection is turn on\n");
        return;
    }
    is_init = true;

    gpio_init(OC_ARM_PIN);
    gpio_init(OC_BASE_PIN);
    gpio_init(OC_ROTOR_PIN);
    gpio_init(OC_HAND_PIN);

    gpio_set_dir(OC_ARM_PIN, GPIO_IN);
    gpio_set_dir(OC_BASE_PIN, GPIO_IN);
    gpio_set_dir(OC_ROTOR_PIN, GPIO_IN);
    gpio_set_dir(OC_HAND_PIN, GPIO_IN);
}

uint set_timer = 0;
int64_t OC_timer_execute(alarm_id_t id, void *args){
    struct OC_Servo *oc_servo = (struct OC_Servo*)args;
    set_timer -= oc_servo->num;
    if(OC_check() & oc_servo->num){
        Servo_stop(oc_servo->servo);
        
    }
    free(oc_servo);
    return 0;
}

void OC_run_timer(Servo_t *servo, uint num){
    if (!(set_timer & num)){
        struct OC_Servo *oc_servo = malloc(sizeof(struct OC_Servo));
        oc_servo->servo = servo;
        oc_servo->num = num;
        add_alarm_in_ms(5000, OC_timer_execute, oc_servo, false);
        set_timer += num;
    }
}