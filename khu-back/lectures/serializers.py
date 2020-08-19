from rest_framework import serializers
from lectures.models import Student, Professor, Lecture

class StudentSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=20)
    department = serializers.CharField(max_length=30)
    student_num = serializers.CharField(max_length=30)
    
    class StudentSerializer(serializers.Serializer):
        class Meta:
            model = Student
            fields = ['id','name','department','student_num']

class ProfessorSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=20)
    department = serializers.CharField(max_length=30)

    class ProfessorSerializer(serializers.Serializer):
        class Meta:
            model = Professor
            fields = ['id','name','department']

class LectureSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    lecture_name = serializers.CharField(max_length=50)
    credit = serializers.IntegerField()

    class LectureSerializer(serializers.Serializer):
        class Meta:
            model = Lecture
            fields = ['id','lecture_name','credit','students']