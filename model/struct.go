package model

type User struct {
	ID       int
	Username string
	Password string
	Email    string
	Addition string
	Avator   string
}

type Comment struct {
	CID      int
	Username string
	Datetime string
	Content  string
	Thumb    int
	Reply    int
	UID      int
}

type CommentA struct {
	CID      int    `json:"cid,omitempty"`
	Username string `json:"username,omitempty"`
	Datetime string `json:"datetime,omitempty"`
	Content  string `json:"content,omitempty"`
	Thumb    int    `json:"thumb,omitempty"`
	Reply    int    `json:"reply,omitempty"`
	UID      int    `json:"uid,omitempty"`
	Avator   string `json:"avator,omitempty"`
}

type Reply struct {
	RID      int
	Username string
	Datetime string
	Content  string
	Thumb    int
	Reply    int
	UID      int
	CID      int
}
