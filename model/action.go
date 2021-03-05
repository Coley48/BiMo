package model

import (
	"crypto/md5"
	"encoding/hex"
	"errors"
	"log"
	"strconv"
	"strings"
)

// UserInquireDB .
func UserInquireDB(key string) (User, error) {
	var mode User
	err := DB.Get(&mode, "select * from admin where username = ?", key)
	return mode, err
}

// UpdatePasswordDB .
func UpdatePasswordDB(username, password string) error {
	tx := DB.MustBegin()
	result := tx.MustExec("update admin set password=? where username = ?", password, username)
	row, _ := result.RowsAffected()
	if row != 1 {
		tx.Rollback()
		return errors.New("Update password failed: rowsAffected")
	}
	tx.Commit()
	return nil
}

func encrypt(str string) string {
	buff := md5.Sum([]byte(str + Keys))
	return hex.EncodeToString(buff[:])
}

// ===========================================================

func date(str string) string {
	array := strings.Split(str, "-")
	return array[0] + "年" + array[1] + "月"
}
func pack(kind string, count int, list interface{}) ArtList {
	return ArtList{
		Kind:  kind,
		Count: count,
		List:  list,
	}
}

// SetAboutDB .
func SetAboutDB(mode Person) error {
	tx := DB.MustBegin()
	result, err := DB.Exec("update person set h5info = ?,mdinfo = ?", mode.H5info, mode.Mdinfo)
	row, _ := result.RowsAffected()
	if row != 1 {
		tx.Rollback()
		log.Println("SetAboutDB:RowsAffected. ")
		return errors.New("Update failed. ")
	}
	if err != nil {
		tx.Rollback()
		return err
	}
	return nil

}

// CountDB .
func CountDB(table string) string {
	var num int
	DB.Get(&num, "select count(id) from "+table)
	return strconv.Itoa(num)
}

// AddClickDB .
func AddClickDB(id int) {
	tx := DB.MustBegin()
	result := tx.MustExec("update article set click = click + 1 where id = ?", id)
	row, _ := result.RowsAffected()
	if row != 1 {
		tx.Rollback()
		log.Println("AddClickDB:RowsAffected.")
	}
	tx.Commit()
}

// GetOthers .
func GetOthers(table string, id int) string {
	var prev artInfo
	var next artInfo
	DB.Get(&prev, "select id,title,datetime from "+table+" where id < ? order by id desc limit 1", id)
	DB.Get(&next, "select id,title,datetime from "+table+" where id > ? limit 1", id)
	return strconv.Itoa(prev.ID) + "\n" + prev.Title + "\n" + strconv.Itoa(next.ID) + "\n" + next.Title
}

// ArticleListDB .
func ArticleListDB(table string, page, numb int) []Section {
	modes := make([]Section, 0, numb)
	DB.Unsafe().Select(&modes, "select * from "+table+" order by id desc limit ?,?", (page-1)*numb, numb)
	return modes
}

// ShowArticleDB .
func ShowArticleDB(table string, id int) Article {
	var mode Article
	DB.Get(&mode, "select * from "+table+" where id = ?", id)
	return mode
}

// UploadArticleDB .
func UploadArticleDB(table string, art Article) error {
	tx := DB.MustBegin()
	command := "insert into " + table + " (`tag`,`title`,`summary`,`content`,`markdown`,`datetime`,`click`,`edit`) values(?,?,?,?,?,?,?,?)"
	tx.MustExec(command, art.Tag, art.Title, art.Summary, art.Content, art.Markdown, art.Datetime, art.Click, art.Edit)
	tx.Commit()
	return nil
}

// DeleteArticleDB .
func DeleteArticleDB(table string, id int) error {
	tx, _ := DB.Begin()
	result, err := tx.Exec("delete from "+table+" where id = ?", id)

	if err != nil {
		tx.Rollback()
		return err
	}

	row, _ := result.RowsAffected()
	if row != 1 {
		tx.Rollback()
		log.Println("DeleteArticleDB:RowsAffected.")
		return errors.New("Delete faild. ")
	}
	tx.Commit()
	return nil
}

// UpdateArticleDB .
func UpdateArticleDB(table string, art Article, id int) error {
	tx := DB.MustBegin()
	result := tx.MustExec("update "+table+" set tag=?, title=?, summary=?, content=?, markdown=?, click=?, edit=? where id = ?", art.Tag, art.Title, art.Summary, art.Content, art.Markdown, art.Click, art.Edit, id)
	row, _ := result.RowsAffected()
	if row != 1 {
		tx.Rollback()
		return errors.New("UpdateArtileDB:RowsAffected. ")
	}
	tx.Commit()
	return nil
}
