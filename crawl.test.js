import { normalizeURL, convertRelativeToAbs, getAnchorEle } from "./crawl";
import { htmlString } from "./testHTMLstring"


test("normalizing url to common url", ()=>{
    expect(normalizeURL("https://blog.boot.dev/path/")).toBe("blog.boot.dev/path")
    expect(normalizeURL("http://blog.boot.dev/path/")).toBe("blog.boot.dev/path")
    expect(normalizeURL("https://blog.boot.dev/path")).toBe("blog.boot.dev/path")
    expect(normalizeURL("https://BLOG.boot.dev/path")).toBe("blog.boot.dev/path")
});

test("convert relativ url to absolute url", ()=>{
    expect(convertRelativeToAbs("path/", "https://blog.boot.dev/")).toBe("https://blog.boot.dev/path/")
    expect(convertRelativeToAbs("/path/", "https://blog.boot.dev/")).toBe("https://blog.boot.dev/path/")
    expect(convertRelativeToAbs("/path/", "https://blog.boot.dev")).toBe("https://blog.boot.dev/path/")
    expect(convertRelativeToAbs("/path/", "https://blog.boot.dev/path/name")).toBe("https://blog.boot.dev/path/name/path/")
    expect(convertRelativeToAbs("/path/", "https://blog.boot.dev/path/name/")).toBe("https://blog.boot.dev/path/name/path/")
    expect(convertRelativeToAbs("path/", "https://blog.boot.dev/path/name")).toBe("https://blog.boot.dev/path/name/path/")
});

test("get all anchor element from HTML string", ()=>{
    expect(getAnchorEle(htmlString)).toBe(501)
});