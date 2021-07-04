package control

import (
	"crypto/md5"
	"encoding/hex"
	"strconv"

	"github.com/Coley48/server/model"
)

type respond struct {
	Code int         `json:"code"`
	Info string      `json:"info"`
	Data interface{} `json:"data"`
}

func Succ(info string, data interface{}) respond {
	return respond{
		Code: 200,
		Info: info,
		Data: data,
	}
}

func Fail(info string, data interface{}) respond {
	return respond{
		Code: 400,
		Info: info,
		Data: data,
	}
}

// Encrypt .
func Encrypt(str string) string {
	buff := md5.Sum([]byte(str + model.Keys))
	return hex.EncodeToString(buff[:])
}

// ToInt .
func Number(str string) int {
	i, _ := strconv.Atoi(str)
	return i
}
