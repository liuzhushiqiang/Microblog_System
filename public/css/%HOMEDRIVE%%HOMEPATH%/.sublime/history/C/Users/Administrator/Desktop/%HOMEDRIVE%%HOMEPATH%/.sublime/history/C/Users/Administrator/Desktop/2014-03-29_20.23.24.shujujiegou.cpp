#define M 1000	//状态数
#define N 50	//字母表大小

typedef struct Element{	
	int num;
	struct Element * next_element;
} Element, *Status;

Status status[M];	//状态
Status transfer_table[M][N];	//状态转移表

char letters[N];