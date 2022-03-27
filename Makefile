OUTDIR = docs
DIST = dist
sources := $(wildcard Challenge??/index.html) 
inter_dist := $(sources:%/index.html=%/$(DIST))
targets := $(sources:%=$(OUTDIR)/%)

all: $(targets) $(OUTDIR)/index.html

.SUFFIXES:

.SECONDEXPANSION:

$(inter_dist): %/$(DIST): $$(wildcard %/*.js) %/index.html 
	@echo "Intermediate target: $@ prereq: $^"
	$(eval $@_wd := $(@:%/$(DIST)=%))
	@echo Working directory: $($@_wd)
	cd $($@_wd); \
	pwd; \
	npm install; \
	npx vite build --base ./

$(targets): $(OUTDIR)/%/index.html: %/$(DIST)
	@echo "Output target: $@ prereq: $^"
	@echo Target directory: $(dir $@)
	cp -av $< $(dir $@)
	touch $@

$(OUTDIR)/index.html: $(OUTDIR)/GHPageIndex/index.html
	cp -av $< $@
	touch $@

clean-dist:
	rm -rvf $(inter_dist)

clean: clean-dist
	rm -rvf $(targets:%/index.html=%)

FORCE:
