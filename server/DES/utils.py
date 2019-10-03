def xor(a, b):
    x = int(a, 2)^int(b,2)
    return bin(x)[2:].zfill(len(a))

def char2bits(s):
    return bin(ord(s))[2:].zfill(8)

def hex2bits(h):
    return bin(int(h, 16))[2:].zfill(4)

def bits2char(b):
    return chr(int(b, 2))

def readFile(fileName):
    with open(fileName, "r") as f:
        return f.read()