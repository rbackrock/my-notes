---
---

``` C++
#include <iostream>
#include <format>

using namespace std;

int main() {
  int* p_ptr = new int;
  *p_ptr = 3;
  cout << format("在堆申请的指针变量p的赋的值是{}", *p_ptr) << endl;
  delete p_ptr;
  cout << format("删除指针变量p之后存储的值是{}", *p_ptr) << endl;

  int* arr_ptr = new int[] { 3, 6, 9 };
  cout << arr_ptr[0] << endl; // 3
  delete[] arr_ptr;
  cout << arr_ptr[0] << endl; // 0

  float priceArray[] = { 3.3f, 6.6f, 9.9f };
  float* priceArray_ptr = priceArray;
  cout << "priceArray数组变量的值：" << priceArray << endl; // 0x...
  cout << "取priceArray数组变量的值：" << &priceArray << endl; // 0x... &priceArray 和 priceArray 输出的值一致，代表的是数组第一个元素的内存地址
  cout << "解priceArray数组的值：" << *priceArray << endl; // 3.3f
  // 数组下标的本质是内存地址的偏移量，偏移的值根据数据类型的字节决定
  cout << *(priceArray + 1) << endl; // 6.6
  /**
   * 数组名称不能改变地址，但是指针变量则可以
   */
  // 下面一行输出会报错
  // cout << *(++priceArray) << endl;
  // 下面这行不会报错
  cout << *(++priceArray_ptr) << endl; // 6.6

  int i = 3;
  int i_tmp = 6;
  const int* i_ptr1 = &i;
  const int* const i_ptr2 = &i;
  /**
   * 从右往左边进行判断更容易理解，第一个 const 代表内存地址为常数只能赋值一次，第二个 const 代表指针变量指向的值为常量，也只能赋值一次
   */
  // 下面这行会报错
  // *i_ptr1 = 333;
  // 下面这行不会报错
  i_ptr1 = &i_tmp;
  // 下面两行都会报错
  // *i_ptr2 = 333;
  // i_ptr2 = &i_tmp;
  
  return 0;
}
```