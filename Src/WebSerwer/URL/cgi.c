#include <cgi.h>

const char *cgi_handler(int index, int numParams, char *param[], char *value[]){


    return "/index.shtml";
}

static const tCGI cgi_handlers[] = {
    {"/cgi", cgi_handler}
};

void cgi_init(){
    http_set_cgi_handlers(cgi_handlers, 1);
}