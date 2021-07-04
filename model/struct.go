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
