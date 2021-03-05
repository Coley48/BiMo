package control

import (
	"crypto/md5"
	"encoding/base64"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"

	"../model"
)

// Token .
type Token struct {
	ID   int
	Name string
}

// Encrypt .
func Encrypt(str string) string {
	buff := md5.Sum([]byte(str + model.Keys))
	return hex.EncodeToString(buff[:])
}

func decode(str string) string {
	result, _ := base64.StdEncoding.DecodeString(str)
	return string(result)
}
func encode(str string) string {
	return base64.StdEncoding.EncodeToString([]byte(str))
}

// DelCookie .
func DelCookie(w http.ResponseWriter, r *http.Request, name string) {
	_, err := r.Cookie(name)
	if err != nil {
		log.Println(err.Error())
		return
	}
	rc := http.Cookie{
		Name:     name,
		MaxAge:   -1,
		Value:    "",
		HttpOnly: true,
		Path:     "/",
		// Expires: time.Unix(1, 0),
	}
	http.SetCookie(w, &rc)
}

// SetCookie .
func SetCookie(w http.ResponseWriter, mode model.User) {
	t := Token{mode.ID, mode.Username}
	c := http.Cookie{
		Name:     "token",
		Value:    TokenMake(t),
		HttpOnly: true,
		Path:     "/",
		// Expires:  t.ExpireTime,
		// Domain:   "127.0.0.1:8000",
	}
	http.SetCookie(w, &c)
}

// TokenMake .
func TokenMake(userinfo Token) string {
	buff, _ := json.Marshal(userinfo)
	head := base64.StdEncoding.EncodeToString(buff)
	summary := md5.Sum([]byte(head + model.Keys))
	tail := hex.EncodeToString(summary[:])
	return head + "." + tail
}

// TokenCheck .
func TokenCheck(w http.ResponseWriter, r *http.Request) bool {
	cookie, err := r.Cookie("token")
	if err != nil {
		return false
	}
	strs := strings.Split(cookie.Value, ".")
	if len(strs) != 2 {
		return false
	}
	var mode Token
	head, _ := base64.StdEncoding.DecodeString(strs[0])
	errs := json.Unmarshal(head, &mode)
	if errs != nil {
		return false
	}

	summary := md5.Sum([]byte(strs[0] + model.Keys))
	tail := hex.EncodeToString(summary[:])
	if tail != strs[1] {
		return false
	}
	return true
}

// MethodCheck 检查请求类型
func MethodCheck(r *http.Request, str string) bool {
	return r.Method == str
}

// ExistCheck is used to check if the file exists.
func ExistCheck(path string) bool {
	_, err := os.Stat(path)
	if err != nil {
		return false
	}
	return true
}

// Respond .
type Respond struct {
	Code int         `json:"code"`
	Info string      `json:"info"`
	Data interface{} `json:"data,omitempty"`
}

func number(str string) int {
	num, _ := strconv.Atoi(str)
	return num
}

func typeof(v interface{}) string {
	return fmt.Sprintf("%T", v)
}

// Reply .
func Reply(code int, errs string, data ...interface{}) Respond {
	if len(data) == 0 {
		return Respond{
			Code: code,
			Info: errs,
		}
	}
	return Respond{
		Code: code,
		Info: errs,
		Data: data[0],
	}
}

// Success .
func Success(w http.ResponseWriter, info string, mode ...interface{}) {
	resp, _ := json.Marshal(Reply(200, info, mode))
	w.Header().Set("content-Type", "application/json")
	w.Write(resp)
}

// Fail .
func Fail(w http.ResponseWriter, info string) {
	resp, _ := json.Marshal(Reply(400, info))
	w.Header().Set("content-Type", "application/json")
	w.Write(resp)
}

// RandName .
func RandName() string {
	bytes := []byte("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ")
	result := []byte{}
	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	for i := 0; i < len(bytes); i++ {
		result = append(result, bytes[r.Intn(len(bytes))])
	}
	return string(result)
}
