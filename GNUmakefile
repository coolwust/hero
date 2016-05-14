# General Variables ##########################################################
 
dev_mode        := true

www_dir         := wwwroot

public_dir      := $(www_dir)/static

npm             := npm
npm_dir         := node_modules
npm_link        := $(public_dir)/node_modules
npm_config      := package.json

tsc             := tsc
tsc_flags       := --target ES5 --experimentalDecorators

pug             := pug
pug_flags       := 

scss            := scss
scss_flags      := 

typings         := typings
typings_dir     := typings
typings_config  := typings.json

systemjs_config := systemjs.json
systemjs_js     := $(public_dir)/systemjs.config.js


ifeq ($(dev_mode),true)
	pug_flags += --pretty
	tsc_flags += --sourceMap
endif

# Server Variables ###########################################################
 
server_src_dir := server
server_cmd     := $(www_dir)/server

# UI Variables ##############################################################
 
ui_src_dir         := ui

ui_tmpl_src_dir    := $(ui_src_dir)/pug
ui_tmpl_dist_dir   := $(www_dir)/template
ui_tmpl_dist_files := $(addprefix $(ui_tmpl_dist_dir)/,$(addsuffix .tmpl,$(basename $(notdir $(wildcard $(ui_tmpl_src_dir)/*.pug)))))

ui_js_src_dir      := $(ui_src_dir)/ts
ui_js_dist_dir     := $(public_dir)/js

ui_css_src_dir     := $(ui_src_dir)/scss
ui_css_dist_dir    := $(public_dir)/css

ui_pug_flags       := $(pug_flags) --out $(ui_tmpl_dist_dir) --extension tmpl

# APP Variables ##############################################################

app_src_dir       := app
app_dist_dir      := $(public_dir)/app

app_list          := $(shell ls $(app_src_dir))

app_tsc_flags     := $(tsc_flags) --module amd --moduleResolution node

app_pug_flags     := $(pug_flags) --extension tmpl

app_scss_flags    := $(scss_flags)

define app_var_template =
app_js_dist_files   += $(addprefix $(app_dist_dir)/$(1)/js/,$(addsuffix .js, $(basename $(notdir $(wildcard $(app_src_dir)/$(1)/ts/*.ts)))))
app_tmpl_dist_files += $(addprefix $(app_dist_dir)/$(1)/tmpl/,$(addsuffix .tmpl, $(basename $(notdir $(wildcard $(app_src_dir)/$(1)/pug/*.pug)))))
app_css_dist_files  += $(addprefix $(app_dist_dir)/$(1)/css/,$(addsuffix .css, $(basename $(notdir $(wildcard $(app_src_dir)/$(1)/scss/*.scss)))))
endef

$(foreach app,$(app_list),$(eval $(call app_var_template,$(app))))

# General Rules ##############################################################

.PNONY: run clean

test: $(app_js_dist_files)

run: $(npm_dir) $(npm_link) $(systemjs_js) ui app ui run_server

$(public_dir):
	mkdir -p $@

$(npm_link): | $(public_dir)
	ln -sf $(abspath $(npm_dir)) $(npm_link)

$(npm_dir): $(npm_config)
	$(npm) install

$(typings_dir): $(typings_config)
	$(typings) install

$(systemjs_js): $(systemjs_config) | $(public_dir)
	printf 'System.config(%s)' "$$(cat $(systemjs_config))" >$@

clean: clean_server clean_ui clean_app
	rm -rf $(npm_link) $(npm_dir)
	rm -rf $(typings_dir)
	rm -rf $(www_dir)

# Server Rules ###############################################################

.PNONY: clean_server run_server

$(server_cmd): $(server_src_dir)
	go build -o $@ ./$(server_src_dir)

clean_server:
	rm -rf $(server_cmd)

run_server: $(server_cmd)
	cd $(dir $(server_cmd)) && ./$(notdir $(server_cmd))

# UI Rules ###################################################################

.DELETE_ON_ERROR: $(ui_tmpl_dist_files)

$(ui_tmpl_dist_files): $(ui_tmpl_dist_dir)/%.tmpl: $(ui_tmpl_src_dir)/%.pug | $(ui_tmpl_dist_dir)
	$(pug) $(ui_pug_flags) $< 

$(ui_tmpl_dist_dir) $(ui_css_dist_dir) $(ui_js_dist_dir):
	mkdir -p $@

ui: $(ui_tmpl_dist_files)

clean_ui:
	rm -rf $(ui_tmpl_dist_dir) $(ui_js_dist_dir) $(ui_css_dist_dir)

# APP Rules ##################################################################

define app_rule_template =
$(app_dist_dir)/$(1)/js/%.js: $(app_src_dir)/$(1)/ts/%.ts $(npm_dir) $(typings_dir)
	$(tsc) $(app_tsc_flags) --outDir $$(dir $$@) $$<

$(app_dist_dir)/$(1)/tmpl/%.tmpl: $(app_src_dir)/$(1)/pug/%.pug
	$(pug) $(app_pug_flags) --out $$(dir $$@) $$<

$(app_dist_dir)/$(1)/css/%.css: $(app_src_dir)/$(1)/scss/%.scss | $(app_dist_dir)/$(1)/css
	$(scss) $(app_scss_flags) $$< $$@

$(app_dist_dir)/$(1)/css:
	mkdir -p $$@
endef

$(foreach app,$(app_list),$(eval $(call app_rule_template,$(app))))

app: $(app_js_dist_files) $(app_tmpl_dist_files) $(app_css_dist_files)

clean_app:
	rm -rf $(app_dist_dir)
