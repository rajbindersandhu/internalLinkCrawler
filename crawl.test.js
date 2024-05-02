import { normalizeURL } from "./crawl";


test("normalizing url to common url", ()=>{
    expect(normalizeURL("https://blog.boot.dev/path/")).toBe("blog.boot.dev/path")
    expect(normalizeURL("http://blog.boot.dev/path/")).toBe("blog.boot.dev/path")
    expect(normalizeURL("https://blog.boot.dev/path")).toBe("blog.boot.dev/path")
    expect(normalizeURL("https://BLOG.boot.dev/path")).toBe("blog.boot.dev/path")
})