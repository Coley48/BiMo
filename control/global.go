package control

import (
	"crypto/md5"
	"encoding/base64"
	"encoding/hex"
	"encoding/json"
	"net/http"
	"strconv"
	"strings"

	"github.com/Coley48/server/model"
	"github.com/labstack/echo/v4"
)

type iToken struct {
	Username  string
	Timestamp int64
}
type iRespond struct {
	Code int         `json:"code"`
	Info string      `json:"info"`
	Data interface{} `json:"data"`
}

func Succ(info string, data interface{}) iRespond {
	return iRespond{
		Code: 200,
		Info: info,
		Data: data,
	}
}

func Fail(info string, data interface{}) iRespond {
	return iRespond{
		Code: 400,
		Info: info,
		Data: data,
	}
}

func MakeToken(t iToken) string {
	buff, _ := json.Marshal(t)
	head := base64.StdEncoding.EncodeToString(buff)
	summary := md5.Sum([]byte(head + model.Keys))
	tail := hex.EncodeToString(summary[:])
	return head + "." + tail
}

func CheckToken(c echo.Context) bool {
	return true

	cookie, err := c.Cookie("t")
	if err != nil {
		return false
	}
	strs := strings.Split(cookie.Value, ".")
	if len(strs) != 2 {
		return false
	}
	var t iToken
	head, _ := base64.StdEncoding.DecodeString(strs[0])
	errs := json.Unmarshal(head, &t)
	if errs != nil {
		return false
	}

	temp := strs[0] + model.Keys
	summary := md5.Sum([]byte(temp))
	tail := hex.EncodeToString(summary[:])
	if tail != strs[1] {
		return false
	}
	return true
}

func Error(c echo.Context) error {
	return c.String(http.StatusForbidden, "请先登录，无法访问！")
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

// ToInt .
func Number64(str string) int64 {
	i, _ := strconv.ParseInt(str, 10, 64)
	return i
}
