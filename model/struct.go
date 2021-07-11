package model

type User struct {
	ID       int
	Username string
	Password string
	Email    string
	Avator   string
	Addition string
}

type UserInfo struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Avator   string `json:"avator"`
}

type Comment struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
	Datetime int64  `json:"datetime"`
	Content  string `json:"content"`
	Likes    int    `json:"likes"`
	Reply    int    `json:"reply"`
	UID      int    `json:"uid"`
	Avator   string `json:"avator"`
}

type Reply struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
	Datetime int64  `json:"datetime"`
	Content  string `json:"content"`
	Likes    int    `json:"likes"`
	UID      int    `json:"uid"`
	Avator   string `json:"avator"`
	CID      int    `json:"cid"`
}
