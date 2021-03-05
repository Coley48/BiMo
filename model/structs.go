package model

// User .
type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Addition string `json:"addition"`
	ID       int    `json:"id"`
}

// ===========================================

// Article .
type Article struct {
	ID       int    `json:"id"`
	Tag      string `json:"tag"`
	Title    string `json:"title"`
	Summary  string `json:"summary"`
	Content  string `json:"content"`
	Markdown string `json:"markdown"`
	Datetime string `json:"datetime"`
	Click    int    `json:"click"`
	Edit     int    `json:"edit"`
}

// Person .
type Person struct {
	Mdinfo string `json:"mdinfo"`
	H5info string `json:"h5info"`
}

// Section in homepage and manage.
type Section struct {
	ID       int    `json:"id"`
	Tag      string `json:"tag"`
	Title    string `json:"title"`
	Summary  string `json:"summary"`
	Datetime string `json:"datetime"`
	Click    int    `json:"click"`
	Edit     int    `json:"edit"`
}

// artInfo in archive and classify.
type artInfo struct {
	ID       int    `json:"id"`
	Title    string `json:"title"`
	Datetime string `json:"datetime"`
}

// ArtList .
type ArtList struct {
	Kind  string      `json:"kind"`
	Count int         `json:"count"`
	List  interface{} `json:"list"`
}
