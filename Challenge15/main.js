import {DOM} from './lib/lazydom/dom.js';

class Main {
    static sample_url = 'MaiRChannel.json';
    static youtube_url = 'https://youtube.com/watch?v=${vid}';
    //`https://youtube.com/watch?v=${video.vid}`

    featured_video = new DOM('#app .featured');
    video_bar = new DOM();
    video_list;

    constructor() {
        this.asyncProcedures();
    }

    async asyncProcedures() {
        const json_data = await this.downloadData();
        this.video_list = this.dataParser(json_data);
        console.log({json_data});

        for (let video of this.video_list) {
            this.appendVideo(video);
        }
    }

    async downloadData() {
        const response = await fetch(Main.sample_url);

        return (response.ok) ? await response.json() : null;
    }

    appendVideo(video) {
        const v = this.video_bar.DOM();
        v.dot([
            //['a.title', video.title, {href: `https://youtube.com/watch?v=${video.vid}`}],
            //['a.thumbnail', '', {href: `https://youtube.com/watch?v=${video.vid}`}],
           ['a.title', video.title],
            ['a.thumbnail > img', '', {src: video.thumb, alt: video.title}],
            ['a', '', {click: (e) => this.selectVideo(video)}],
        ]);
    }

    selectVideo = (v) => {
        console.log({v});
        console.log('url: ', v.url);
        this.featured_video.dot([
            ['a.video', '', {href: v.url}],
            ['a.video img', '', {src: v.thumb, alt: v.title}],
            ['p.title', v.title],
            ['p.description', v.desc],
        ]);
    }

    dataParser(data) {
        const items = [];
        for (let v of data.items) {
            items.push(this.videoParser(v));
        }
        return items;
    }

    videoParser(video) {
        return {
            vid: video.id.videoId,
            title: video.snippet.title,
            desc: video.snippet.description,
            thumb: video.snippet.thumbnails.high.url,
            url: this.ytUrl(video.id.videoId),
            //width: 120, height: 90;
        }
    }

    ytUrl(vid) {
        const p = /\$\{vid\}/;
        return Main.youtube_url.replace(p, vid);
    }
}

const main = new Main();
