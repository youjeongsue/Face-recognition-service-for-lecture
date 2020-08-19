from django.db import models

#Student
class Student(models.Model):
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=100)
    name = models.CharField(max_length=20)
    department = models.CharField(max_length=30)
    student_num = models.CharField(max_length=30)
    
    is_deleted = models.BooleanField(default=False)
    
    def __str__(self):
        return self.name

#Class
class Lecture(models.Model):
    lecture_name = models.CharField(max_length=50)
    credit = models.IntegerField()
    students = models.ManyToManyField('Student', blank=True)

    def __str__(self):
        return self.lecture_name

#Professor
class Professor(models.Model):
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=100)
    name = models.CharField(max_length=20)
    department = models.CharField(max_length=30)
    lectures = models.ManyToManyField('Lecture', blank=True)
    
    is_deleted = models.BooleanField(default=False)
    
    def __str__(self):
        return self.name

#TODO
class Score(models.Model):
    lecture_name = models.ForeignKey(Lecture, on_delete=models.CASCADE)
    key = models.CharField(max_length=240)
    value = models.CharField(max_length=10)