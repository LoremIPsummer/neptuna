# Neptuna

## Bevezető

A Neptuna egy koncepcióprojekt, aminek fő célja a redux, react és a typescript viszonyának kipróbálása/tesztelése. Az app írása során igyekeztem a megszokott javascript vonallal szemben (és néha túlbuzgóan) a típusbiztosságot megteremteni.
Alapvetően egy web1-re leegyszerűsített neptun klónról van szó, ahol különböző jogosultságú szereplők (diákok, tanárok és adminsztrátorok) vannak. A weblapon a már regisztrált fiókokkal be lehet jelentkezni (email megerősítést követően), lehet regisztrálni, diákként lehetőség van tantárgyak felvételére, valamint azok leadására. Adminisztrátorként lehetőségünk van más felhasználók (diák, oktató, esetlegesen új admin) felvételése, illetve törlésére, továbbá tantárgyak létrehozására és törlésére.


## Architektúra

Alapvetően egy "request-response" életciklus a következőkből áll: 
A komponens meghív egy metódust egy speciális hook-ot. A hook meghívja a redux storeból a kiválasztott thunkot (amely segítségével aszinkron reducerek írhatók), a thunk végrehajta az elkülönítve tárolt, beimportált "nyers" axios hívást, amely során beállítja a loading értékét az api hívás befejeztéig, majd a kapott válasz leellenőrzése után (BaseResponse vagy ApiError wrapper interfészek) a beállított error a válasz státusz kódjából (nagyobb egyenlő, mint 400) (vagy siker esetén a displayable interfész tagjából, amely jelzi, hogy a kapott eredményt siker esetén meg kívánjuk jeleníteni) a toastr csomag felhasználásával megjeleníti.

##  Perzisztencia

Bejelentkezésnél, ha a felhasználó bepipálta a "Neptunakód megjegyzése" lehetőséget, a neptunakódja elmentésre kerül és a következő bejelentkezése során automatikusan kitöltődik. A backenddel való szinkronizálása JWT került használatra, amit a "token" nevű cookie-ban tárolok, és minden axios-szal történő híváskor felhasználok ( request interceptor). A fő tárolás a redux store-ban történik. Itt tárolom többek között a betöltött felhasználókat, tantárgyakat, responsekből származó hibákat/státusz kódokat. Itt tárolódik a "loading" logika, melynek ha értéke true, megjelenik a töltés indikátor. A konkurrens műveletek miatt bevezettem a meta alapú töltés mutatást), ezzel elkerülve a "laggy" hatást, amikor egyszerre több aszinkron művelet állítja át a loading értékét. 

## Témázás / Stílusozás

A projekt során a bootstrap könyvtárat használtam fel, kiegészítve néhol saját scss stílussal. Eleinte a fő útvonal a css modules volt, azonban úgy döntöttem (mivel hasonlít az Angular megközelítéshez), hogy kipróbálom a scoped scss csomagot. A témázást a ThemeContext és a "themify" megközelítéssel oldottam meg, tisztán scss módszerrel, azonban olyan komponenseknél (lásd React-bootstrap), ahol direkt scoped scss módon nem lehet felülírni az értékeiket, ott hasznát vettem a useTheme hooknak a szükséges téma alkalmazásához. Amely third party komponenseket többször felhasználtam, azokat globális scss fájlban (neptuna.scss - ahol többek között a custom scss fájljaimat egységesítem) írtam felül.

## Lehetséges fejlesztések

 1. Cache használata és a felhasználó általi műveletek figyelése annak érdekében, hogy ne kelljen minden egyes alkalommal az adatokat újra lekérni.
 2. Soksoksok typeguard egyszerűsítése egy BaseResponse | ApiError ellenőrzésre. (Mivel minden válasz egyben BaseResponse, aminek van result tagja, míg az ApiErrornak nincs, ezért evidens)
 3. Mivel viszonylag hosszú folyamat a meglévő rendszert kibővíteni egy-egy új lekéréssel (lást Architektúra rész), érdemes lenne egy olyan módszert találni, amivel kevésbé lenne repetatív a kód. (Ez leginkább a redux és a túlzott típusbiztosság miatt  feltűnő.)

