OUTDIR = docs
DIST = dist
sources := $(wildcard Challenge??/index.html)
inter_dist := $(sources:%/index.html=%/$(DIST))
targets := $(sources:%=$(OUTDIR)/%)

all: $(targets)

$(inter_dist): %/$(DIST): %/main.js 
	@echo "Intermediate target: $@ prereq: $^"
	$(eval $@_wd := $(@:%/$(DIST)=%))
	@echo Working directory: $($@_wd)
	cd $($@_wd); \
	pwd; \
	npm install; \
	npx vite build --base ./

$(targets): $(OUTDIR)/%/index.html: %/$(DIST)
	@echo "Output target: $@ prereq: $^"
	$(eval $@_tg := $(@:%/index.html=%))
	@echo Target directory: $($@_tg)
	cp -rv $< $($@_tg)

clean:
	rm -rvf $(inter_dist)
	rm -rvf $(targets:%/index.html=%)
