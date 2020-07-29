## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。
1. `<strong></strong>` 多數用於 `<p>` 內，會以粗體來加強文字的語氣。和 `<b>` 不同的地方，`<b>` 會粗體文字但沒有加強的語意。類似的 tag 有 `<em>/<i>`。

2. `<video></video>` 因為每個瀏覽器支援的影片格式都不同，在 video tag 中你可以用 `<source>` 去提供不同格式的影片給瀏覽器選擇。 video tag 中有不同屬性, 例如: `autoplay` 可以自動播放、`width heigh` 可以控制視頻寛度高度、`loop` 可以循環播放。 `loop` 加上 `autoplay` 好像可以做到 gif 的效果。

```html
<video controls width="250" autoplay=true loop=true>

    <source src="/media/examples/flower.webm"
            type="video/webm">

    <source src="/media/examples/flower.mp4"
            type="video/mp4">

    Sorry, your browser doesn't support embedded videos.
</video>
```

3. `<table></table>` 在配合 `thead`、`tbody`、`tr`和`td` 在網頁中做出 table
```html
<table>
    <thead>
        <tr>
            <th colspan="2">The table header</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>The table body</td>
            <td>with two columns</td>
        </tr>
    </tbody>
</table>
```
![table]()

## 請問什麼是盒模型（box model）
![box-model]()

所有的 HTML 元素都有自己的 box model，box model 決定了元素的高寛。box model 由 margin, border, paading 和 content 所組成。

- margin 決定元素之間的距離。
- border 可以在你的元素加上外框
- padding 控制 content 和 border 之間的距離
- content 就是你的內容，可以是文字，相片，影片，table 等等…

當你的 content 有固定寛高時，padding border 會向外廷伸。但當你的 content 沒有固定寛高，margin, border padding 會向內廷伸，減少 content 的寛高。


## 請問 display: inline, block 跟 inline-block 的差別是什麼？
inline: 不可以設定寛高，寛高是根據元素內的 content 來決定。雖然可以以左右 padding 來加大元素的整體寛度，但 padding 不會改變元素高度。 可以和其他非 block 的元素並列同一行。當你的元素排版只需要並排在同一行，高度不重要時就可以用到 inline。

block: 元素的寛高可以自訂，但不能和其他元素並列同一行。當你想元素獨佔一列就可以設定為 display: block。

inline-block: 有了 inline 的元素並列同一行和 block 的元素可以自訂寛高的特性。當你想元素可以像 inline 並列一行同可以設定寛高就會用到 inline-block。

## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？
static: postition 的預設值，元素位置會根據瀏覽器預設的配置自動排版在頁面上。

relative: 以本身元素排版位置作定位點，可以根據定位點偏移元素。不論有沒有設定偏移，元素本身的位置和空間沒有改變。設定了 position:relative 的元素可以用 z-index 來決定排版前後，數字越大，就會在上層。可以用與兩個物件的位置交換。

absolute: 設定了 position: absolute 的元素會向上層不是 static 的元素作定位點。與 relative 不同，元素本身的的位置和空間會好似向上一層移動，在本身元素下的物件會替補 absolute 元素的位置和空間。如果元素向上找不到不是 static 的元素，會以瀏覽器為定位點，但同fixed 不同，它是不會跟着瀏覽器的移動。當元素不需要和其他物件一齊並列就可以用到。

fixed: 以瀏覽器視窗為定位點，當瀏覽器上下捲動，元素會跟着移動。十分常用於網頁中的廣告。
