#define M 1000	//状态数
#define N 50	//字母表大小

Char letters [N];	//字母表
Status status[M];	//状态
Status transfer_table[M][N];	//状态转移表

Struct Element{	
	int num;
	Struct Element * next_element;
}Element, *Status;	//Element为状态中的元素，Status为一个状态（一个集合）