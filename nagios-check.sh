#!/bin/bash

errors=$(curl http://software.cmb.sil.org/index.html | egrep -o "error-message=[^>]+")

if [ -z "$errors" ]; then
    exit 0
fi

echo $errors
exit 1