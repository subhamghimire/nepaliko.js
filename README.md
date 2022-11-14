# nepaliko.js
This is the fun programming language. Do Programming in Nepali Language, kind of Nepangrezi.

## Usage

### Create a new file (example.nepaliko)
<pre>
namaste
  bhana "Hello k cha khabar";
dhanyabad
</pre>

This is the example where `namaste` is the entrypoint for the program and program must end with `dhanyabad`. Anything outside of it will be ignored.


### Run
<pre>
nepaliko example.nepaliko
</pre>

### Output

<pre>
Hello k cha khabar
</pre>


## Variables
#### variables can be declared using `yo` keyword
<pre>
namaste
  yo a = 1;
  yo b = "two";
  yo c = 3;
  a = a + 1;
  b = 25;
  c *= 5;
dhanyabad
</pre>

## Input
### `laga` keyword will be used as input statement
<pre>
namaste
yo laga a;
a = "Namaste Bisow";
a
dhanyabad
</pre>

## Types
#### Numbers and strings are like other languages. Null values can be denoted using `khali`. `thik` and `bethik` are the boolean values.

<pre>
namaste
  yo a = 2;
  yo b = 2 + (3*5);
  yo c = "one";
  yo d = 'ok';
  yo e = khali;
  yo f = thik;
  yo g = bethik;
dhanyabad

</pre>

## Conditions
#### Nepaliko supports simple if else construct , `yadi` block will execute if condition is true(thik) and `nabhaye` block will execute if condition is false(bethik).

<pre>
namaste
  yo a = 10;
  yadi (a < 20) {
   bhana "a is less than 20";
  } nabhaye {
   bhana "a is greater than or equal to 20";
  }
dhanyabad
</pre>


## Loops

#### Statements inside `jaba samma` blocks are executed as long as a specified condition evaluates to `thik`. If the condition becomes `bethik`, statement within the loop stops executing and control passes to the statement following the loop. Use `bhayo` to break the loop and `jari` to continue within loop.

<pre>

namaste
  yo a = 0;
  jaba samma (a < 20) {
   a += 1;
   yadi (a == 5) {
    bhana "dekha ", a;
    jari;
   }
   nabhaye (a == 6) {
    bhayo;
   }
   bhana a;
  }
  bhana "done";
dhanyabad

</pre>

## Functions
### `kaam` will replace function 
<pre>
namaste
kaam(){
yo a += b;
a
}
dhanyabad
</pre>









