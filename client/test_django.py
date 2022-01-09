#!/usr/bin/python3
#coding: utf-8
import requests

r=requests.post('http://127.0.0.1:8081/post', data={'persentage':'10'})

print(r.text)
