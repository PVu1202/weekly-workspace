def main():
    # 1. Nhập kích thước mảng (số lượng phần tử)
    n = int(input("Nhập kích thước mảng: "))
    
    # Kiểm tra kích thước hợp lệ
    if n <= 0:
        print("Kích thước mảng phải lớn hơn 0!")
        return

    # 2. Nhập từng phần tử của mảng
    arr = []
    print("Nhập từng phần tử của mảng:")
    for i in range(n):
        val = int(input(f"  Phần tử thứ {i + 1}: "))
        arr.append(val)

    # 3. Hiển thị các phần tử trong mảng
    print("\n----------------------------------")
    print("Mảng đã nhập:", arr)

    # 4. Tìm phần tử nhỏ nhất và hiển thị ra màn hình
    min_val = min(arr)
    print(f"Giá trị nhỏ nhất trong mảng: {min_val}")

    # 5. Tính giá trị trung bình cộng của mảng
    avg_val = sum(arr) / len(arr)
    print(f"Giá trị trung bình của mảng: {avg_val:.2f}")

if __name__ == "__main__":
    main()