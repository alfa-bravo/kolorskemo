#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wed Nov 14 22:49:15 2018

@author: jennifernghinguyen
"""
from argparse import *

def model(input):
    
    
    
    # should be return list of names
    return ['color1','color2','color3','color4','color5']

def main():
    parser = ArgumentParser(description='Run ML model..')
    parser.add_argument('input_color', nargs="+")
    args = parser.parse_args()
    if len(args.input_color) == 5:
        print(model(args.input_color))
        return model(args.input_color)
  

if __name__ == "__main__":
    main()
    