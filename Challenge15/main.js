import { DOM } from './lib/lazydom/dom.js';

class YTData {
    static sample_url = 'MaiRChannel.json';
    static yt_url = 'https://youtube.googleapis.com/youtube/v3/search';
    static mair_cid = 'UCsiKFVHkQSMlSe0vaCG0anw';

    constructor(api_key) {
        this.api_key = api_key;
    }

    buildUrl(key) {
        if (!key) return YTData.sample_url;

        const url = new URL(YTData.yt_url);
        url.searchParams.set('part', 'snippet,id');
        url.searchParams.set('channelId', YTData.mair_cid);
        url.searchParams.set('maxResults', '20');
        url.searchParams.set('order', 'date');
        url.searchParams.set('key', key);

        return url;
    }

    async downloadData() {
        return (
            (await this.downloadDataFb()) ?? (await this.downloadDataFb(true))
        );
    }

    async downloadDataFb(fallback = false) {
        if (fallback) console.warn('Fallback to fetch prepared sample data...');
        const url = fallback ? YTData.sample_url : this.buildUrl(this.api_key);
        console.log('Trying to fetch data from ', url);
        const response = await fetch(url);

        return response.ok ? await response.json() : null;
    }
}

class Main {
    //static youtube_url = 'https://youtube.com/watch?v=${vid}';
    static youtube_url = 'https://www.youtube-nocookie.com/embed/${vid}';


    featured_video = new DOM('#app .featured');
    video_bar = new DOM();
    video_list;

    constructor() {
        this.yt = new YTData(this.getKey());
        this.asyncProcedures();
    }

    async asyncProcedures() {
        await this.#downData();
        await this.#buildVideoList();
        await this.#selectFirstVideo();
    }

    async #downData() {
        const json_data = await this.yt.downloadData();
        this.video_list = this.dataParser(json_data);
        console.log({ json_data });
    }

    async #buildVideoList() {
        for (let video of this.video_list) {
            this.appendVideo(video);
        }
    }

    async #selectFirstVideo() {
        this.selectVideo(this.video_list[0]);
    }

    appendVideo(video) {
        const v = this.video_bar.DOM();
        v.dot([
            ['a.title', video.title],
            ['a.thumbnail > img', '', { src: video.thumb, alt: video.title }],
            ['a', '', { click: (e) => this.selectVideo(video) }],
        ]);
    }

    selectVideo = (v) => {
        console.log({ v });
        console.log('url: ', v.url);
        this.featured_video.dot([
            //['a.video', '', { href: v.url }],
            //['a.video img', '', { src: v.thumb, alt: v.title }],
            ['a.video iframe', '', { src: v.url }],
            ['p.title', v.title],
            ['p.description', v.desc],
        ]);
    };

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
        };
    }

    ytUrl(vid) {
        const p = /\$\{vid\}/;
        return Main.youtube_url.replace(p, vid);
    }

    getKey() {
        const params = new URL(document.location).searchParams;
        return params.get('key');
    }
}

const main = new Main();
