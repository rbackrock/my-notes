---
---

```C++
#include <iostream>
#include <format>

using namespace std;

int main() {
  int i { 3 };
  cout << format("i变量值为{}", i) << endl; // 3

  int arr[] { 3, 6, 9 };
  cout << format("数组中第三个元素的值是{}", arr[2]) << endl; // 9

  string str = "string";
  cout << format("str的值为{}", str) << endl; // string

  int n { 3 };
  int* n_ptr = &n;
  int nValue = *n_ptr;
  cout << "n的指针值为" << n_ptr << endl; // 0x...
  cout << format("n的指针变量取值以后的结果值为{}", nValue) << endl; // 3

  int val { 3 };
  cout << format("val的原始值为{}", val) << endl; // 3
  int& val_copy = val;
  val_copy = 9;
  cout << format("val的引用变量val_copy引用会改变val，结果为{}", val) << endl; // 9

  return 0;
}
```