package main

import (
	"net/http"
	"html/template"
)

func main() {
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./static"))))
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		template.Must(template.ParseFiles("template/index.tmpl")).Execute(w, nil)
	});
	http.ListenAndServe(":80", nil)
}
